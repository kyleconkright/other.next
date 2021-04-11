import axios from 'axios';
import * as cron from 'node-cron';

import FeedItem from './../../schemas/feedItem';

const type = 'vmp-exclusive';

export class VinylMePleaseJob {
	public async execute() {
		cron.schedule("5 0 */1 * * *", async () => {
			try {
				const releases = await this.getReleases();
				this.updateReleases(releases);
			} catch(err) {
				console.error(err);
			}
    }, {})
	}

	async getReleases() {
		const { data: releases } = await await axios.get('https://www.vinylmeplease.com/collections/new-this-month?view=products.json');
		if(!!releases) await FeedItem.deleteMany({ type });
		return releases.products;
	}

	async updateReleases(releases) {
		releases.map(async release => {
			try {
				await FeedItem.create(
					{
						title: `${release.artist_title} - ${release.album_title}`,
						url: `https://www.vinylmeplease.com/products/${release.product.handle}`,
						origin: `https://www.vinylmeplease.com/products/${release.product.handle}`,
						flair: 'exclusive',
						price: (release.product.price_min / 100),
						imageUrl: release.product.featured_image,
						createdUtc: new Date(release.product.published_at),
						type
					}
				);
			} catch (error) {
				console.error(error);
				return error;
			}
		});
	}
}