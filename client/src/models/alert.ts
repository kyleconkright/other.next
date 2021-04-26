export interface Alert {
  item: any;
  details: AlertDetails
}

export interface AlertDetails {
  userId: String,
  releaseId: String,
  alertId: String,
  notes: String,
  asin: String,
  frequency: String,
  paused: Number,
}