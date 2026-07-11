import fastifyPassport from '@fastify/passport';
import fp from 'fastify-plugin';
import i18next from 'i18next';
import FormStrategy from '../lib/passportStrategies/FormStrategy.js';

export default fp(
  async (fastify) => {
    fastifyPassport.registerUserDeserializer((user) =>
      fastify.objection.models.user.query().findById(user.id),
    );
    fastifyPassport.registerUserSerializer((user) => Promise.resolve(user));
    fastifyPassport.use(new FormStrategy('form', fastify));
    await fastify.register(fastifyPassport.initialize());
    await fastify.register(fastifyPassport.secureSession());
    await fastify.decorate('fp', fastifyPassport);
    fastify.decorate('authenticate', (...args) =>
      fastifyPassport.authenticate('form', {
        failureRedirect: fastify.reverse('welcome'),
        failureFlash: i18next.t('messages.auth_error'),
      })(...args),
    );
  },
  {
    name: 'passport',
    dependencies: ['objection', 'secure-session'],
  },
);
