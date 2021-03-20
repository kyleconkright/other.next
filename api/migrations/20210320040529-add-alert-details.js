module.exports = {
  async up(db) {
    await db.collection('alerts').find().forEach((alert) => {
      Object.values(alert.maxPrice).forEach(async price => {
        const userId = Object.keys(price)[0];
        const releaseId = alert.item.id;
        const alertId = alert._id;
        const notes = alert.item.notes;
        const alertDetail = {alertId, userId, releaseId, notes, frequency: '', paused: false};
        try {
          await db.collection('alertdetails').updateOne({userId, releaseId}, {$set: {...alertDetail}}, {upsert: true})
        } catch(error) {
          console.error(error);
        }
      })
    }) 
  },

  async down(db) {
    return Promise.resolve('ok');
  }
};
