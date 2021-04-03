import { NewburyJob } from './feeds/newbury.job';
import { ZiaJob } from './feeds/zia.job';
import { UrbanOutfittersJob } from './feeds/urban-outfitters.job';

const newbury = new NewburyJob();
const zia = new ZiaJob();
const uo = new UrbanOutfittersJob();

export function runJobs() {
  newbury.execute();
  zia.execute();
  uo.execute()
}