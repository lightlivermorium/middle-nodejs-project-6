import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fastifyStatic } from '@fastify/static';
import fp from 'fastify-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default fp(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../../dist/assets'),
    prefix: '/assets/',
    decorateReply: false,
  });
});
