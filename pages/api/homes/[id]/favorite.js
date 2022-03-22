import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  // TODO: Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  // TODO: Retrieve home ID from request
  const { id } = req.query;
  console.log('home id: ' + id);

  // TODO: Add home to favorite
  if (req.method === 'PUT') {
    try {
      const home = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          favoriteHomes: {
            connect: { id },
          },
        },
        include: {
          listedHomes: true,
          favoriteHomes: true,
        },
      });
      res.status(200).json(home);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // TODO: Remove home from favorite
  else if (req.method === 'DELETE') {
    try {
      const home = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          favoriteHomes: {
            disconnect: { id },
          },
        },
        include: {
          listedHomes: true,
          favoriteHomes: true,
        },
      });
      res.status(200).json(home);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
