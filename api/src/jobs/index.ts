import { NewburyJob } from './feeds/newbury.job';
import { VinylMePleaseJob } from './feeds/vinylmeplease.job';
import { ZiaJob } from './feeds/zia.job';
import { UrbanOutfittersJob } from './feeds/urban-outfitters.job';
import { RedditJob } from './feeds/reddit.job';
import { AmazonJob } from './feeds/amazon.job';
import { EbayClient } from './feeds/ebay.job';

const newbury = new NewburyJob();
const vinylmeplease = new VinylMePleaseJob();
const zia = new ZiaJob();
const uo = new UrbanOutfittersJob();
const redditJob = new RedditJob();
const amazonJob = new AmazonJob();
const ebayJob = new EbayClient();

export function runJobs() {
  newbury.execute();
  vinylmeplease.execute();
  // zia.execute();
  // uo.execute();

  redditJob.execute();
  amazonJob.execute();
  ebayJob.execute();
}