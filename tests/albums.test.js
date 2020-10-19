const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/models');

describe('/albums', () => {
  let artist;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artistId).to.equal(artist.id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.findAll({where:{name: 'InnerSpeaker'}}).then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });
  });

  describe('with albums in the database', () => {
    let albums;
    beforeEach((done) => {
      Promise.all([
        Album.create({ name: 'Murmur', year: 1983 }),
        Album.create({ name: 'Reckoning', year: 1984 }),
        Album.create({ name: 'Document', year: 1987 }),
      ]).then((documents) => {
        albums = documents;
        done();
      });
    });

  describe('GET /albums', () => {
    it('gets all album records', (done) => {
      request(app)
        .get('/albums')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          res.body.forEach((album) => {
            const expected = albums.find((a) => a.id === album.id);
            expect(album.name).to.equal(expected.name);
            expect(album.year).to.equal(expected.year);
          });
          done();
        });
      });
    });

    describe('PATCH /albums/:id', () => {
      it('updates album name by id', (done) => {
        const album = albums[0];
        request(app)
          .patch(`/albums/${album.id}`)
          .send({ name: 'Green' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Album.findByPk(album.id, { raw: true }).then((updatedAlbum) => {
              expect(updatedAlbum.name).to.equal('Green');
              done();
            });
          });
      });
      it('updates artist year by id', (done) => {
        const album = albums[0];
        request(app)
          .patch(`/albums/${album.id}`)
          .send({ name: 'Green' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Album.findByPk(album.id, { raw: true }).then((updatedAlbum) => {
              expect(updatedAlbum.name).to.equal('Green');
              done();
            });
          });
      });  
      it('updates artist genre & name by id', (done) => {
        const album = albums[0];
        request(app)
          .patch(`/albums/${album.id}`)
          .send({ year: 1988, name: 'Green' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Album.findByPk(album.id, { raw: true }).then((updatedAlbum) => {
              expect(updatedAlbum.name).to.equal('Green');
              done();
            });
          });
      });     
});

describe('DELETE /albums/:albumId', () => {
  it('deletes album record by id', (done) => {
    const album = albums[0];
    request(app)
      .delete(`/albums/${album.id}`)
      .then((res) => {
        expect(res.status).to.equal(204);
        Album.findByPk(album.id, { raw: true }).then((updatedAlbum) => {
          expect(updatedAlbum).to.equal(null);
          done();
        });
      });
  });
  it('returns a 404 if the artist does not exist', (done) => {
    request(app)
      .get('/albums/12345')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('the album could not be found.');
        done();
      });
    });
});
  });
});
