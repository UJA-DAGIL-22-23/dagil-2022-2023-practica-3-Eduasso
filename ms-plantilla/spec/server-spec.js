/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Reinhold Messner al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('Nombre'));
          assert(res.body.data[0].data.Nombre === "Reinhold Messner");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve un vector de tamaño 10 al consultar mediante getTodas', (done) => {
      supertest(app)
        .get('/getTodas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.length === 10);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve 0 al recuperar los datos de la Persona con id 354047338258366678 mediante getPorId', (done) => {
      supertest(app)
        .get('/getPorId/359742235299807436')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('cantidad_picos_8km'));
          assert(res.body.data.cantidad_picos_8km === 0);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve Rogelio al recuperar los datos de la Persona con id 359742297009553613 mediante setTodo', (done) => {
      const NOMBRE_TEST= 'Rogelio'
      const persona = {
        id_persona: '359742297009553613', //Anteriormente Albert Mummery
        nombre_persona: NOMBRE_TEST,
        dia_persona: 10,
        mes_persona: 9,
        anio_persona: 1855,
        pais_persona: 'Reino Unido',
        cumbres_escaladas: ['Cervino'],
        picos_8km: 0
      };
      supertest(app)
        .post('/setTodo')
        .send(persona)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Server-spec , /setTodo res.body", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('Nombre'));
          assert(res.body.data.Nombre === NOMBRE_TEST);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

  })
});


