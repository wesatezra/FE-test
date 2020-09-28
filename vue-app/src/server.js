import {
  Server,
  Model,
  Factory,
  trait,
  belongsTo,
  hasMany,
  RestSerializer,
} from 'miragejs'
import faker from 'faker'

// Create a root serializer which we'll use as our default behaviour
const rootSerializer = RestSerializer.extend({
  embed: true,
  root: false,
  serializeIds: 'always',
})

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    // Define models, Users will have multiple appointments, while an appointment can belong to only a single user
    models: {
      user: Model.extend({
        appointments: hasMany(),
      }),

      appointment: Model.extend({
        user: belongsTo(),
      }),
    },

    // Define the creation factories
    factories: {
      user: Factory.extend({
        firstName: () => faker.name.firstName(),
        lastName: () => faker.name.lastName(),
        email: () => faker.internet.email(),
        avatar: () =>
          faker.random.boolean() ? faker.internet.avatar() : undefined,

        // Create a trait which when specified, after the creation of a user, creates up to 3 random appointments for the user
        withAppointments: trait({
          afterCreate(user, server) {
            server.createList('appointment', faker.random.number(3), { user })
          },
        }),
      }),

      appointment: Factory.extend({
        when: () => faker.date.between('2015/04/20', '2025/04/20'),
        notes: () =>
          faker.random.boolean()
            ? faker.lorem.sentences(faker.random.number(4))
            : undefined,
        paid: () => faker.random.boolean(),
      }),
    },

    // Set up the serializers, application takes the earlier defined one,
    // while user extends it to include any associations in it's response
    serializers: {
      application: rootSerializer,
      user: rootSerializer.extend({
        include(request, resource) {
          if (resource) {
            return Object.keys(this.schema.associationsFor(resource.modelName))
          }
        },
        normalize(json) {
          return { data: { type: 'user', id: json['id'], attributes: json } }
        },
      }),
      appointment: rootSerializer.extend({
        include(request, resource) {
          if (resource) {
            return Object.keys(this.schema.associationsFor(resource.modelName))
          }
        },
        normalize(json) {
          return { data: { type: 'appointment', id: json['id'], attributes: json } }
        },
      }),
    },

    // Define the routes for users and appointments under the namespace api
    routes() {
      this.namespace = 'api'
      this.resource('user')
      this.resource('appointment')
    },

    // Seed the server with users with appointments
    seeds(server) {
      server.createList('user', 10, 'withAppointments')
    },
  })

  return server
}
