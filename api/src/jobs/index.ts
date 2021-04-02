import { NewburyJob } from './feeds/newbury.job';

const newbury = new NewburyJob();

export function runJobs() {
  newbury.execute();
}