module.exports = {
  async up(db, client) {
    await db.collection('feeditems').updateMany({}, {$set: {origin: ''}});
  },

  async down(db, client) {
    await db.collection('feeditems').updateMany({}, {$unset: {origin: null}});
  }
};
