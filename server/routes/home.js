export default async function (fastify) {
  fastify.get('/', { name: 'home' }, async (_request, reply) => {
    return reply.view('pages/home.pug', {
      title: 'Hexlet Project',
    });
  });
}
