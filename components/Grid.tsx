import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from './Card';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

const Grid = ({ homes = [] }) => {
  const { data: session } = useSession();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const response = await axios.get(`/api/user/favorites`);
          console.log(response);
          setFavorites(response.data[0].favoriteHomes.map((home) => home.id));
        } catch (e) {
          console.log('error');
        }
      }
    })();
  }, [session?.user]);

  const isEmpty = homes.length === 0;

  const toggleFavorite = async (id, favorite) => {
    if (favorite) {
      try {
        const response = await axios.delete(`/api/homes/${id}/favorite`, id);
        setFavorites(favorites.filter((ids) => ids !== id));
      } catch (e) {
        console.log('error');
      }
    } else {
      try {
        // let data = homes.filter((home) => home.id === id);
        const response = await axios.put(`/api/homes/${id}/favorite`, id);
        setFavorites([...favorites, id]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {homes.map((home) => (
        <Card
          key={home.id}
          {...home}
          onClickFavorite={toggleFavorite}
          favorite={favorites.includes(home.id)}
        />
      ))}
    </div>
  );
};

export default Grid;
