import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/solid';

interface Card {
  id: string;
  image: string;
  title: string;
  description: string;
  guests: number;
  beds: number;
  baths: number;
  price: number;
  favorite: boolean;
  onClickFavorite: (id: string, favorite: boolean) => void;
}

const Card = ({
  id = '',
  image = '',
  title = '',
  guests = 0,
  beds = 0,
  baths = 0,
  price = 0,
  favorite = false,
  onClickFavorite = () => null,
}: Card) => (
  <Link href={`/homes/${id}`}>
    <a className="block w-full">
      <div className="relative bg-gray-200 rounded-lg shadow overflow-hidden aspect-video">
        {image ? (
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="hover:opacity-80 transition"
          />
        ) : null}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (typeof onClickFavorite === 'function') {
              onClickFavorite(id, favorite);
            }
          }}
          className="absolute top-2 right-2"
        >
          <HeartIcon
            className={`w-7 h-7 drop-shadow-lg transition ${
              favorite ? 'text-red-500' : 'text-white'
            }`}
          />
        </button>
      </div>
      <div className="mt-2 w-full inline-flex justify-between space-x-4">
        <span className="truncate text-gray-700 font-semibold">
          {title ?? ''}
        </span>
        <span className="shrink-0">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price ?? 0)}{' '}
          <span className="text-gray-500">/night</span>
        </span>
      </div>
      <ol className="inline-flex items-center space-x-1 text-gray-500">
        <li>
          <span>{guests ?? 0} guests</span>
          <span aria-hidden="true"> · </span>
        </li>
        <li>
          <span>{beds ?? 0} beds</span>
          <span aria-hidden="true"> · </span>
        </li>
        <li>
          <span>{baths ?? 0} baths</span>
        </li>
      </ol>
    </a>
  </Link>
);

export default Card;
