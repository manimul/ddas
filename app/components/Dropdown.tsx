import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, NavLink } from '@remix-run/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Define the interface for each dropdown item
interface DropdownItem {
  slug: string;
  text: string;
}

// Define the props for the Dropdown component
interface DropdownProps {
  title: string;
  items: DropdownItem[];
  setNavbar?: (value: boolean) => void;
}

export default function Dropdown({ items, title, setNavbar }: DropdownProps) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full items-center	 align justify-center gap-x-1.5 rounded-md   py-2 text-sm   ring-gray-300 '>
          {title}
          <ChevronDownIcon className='-mr-1 h-5 w-5 ' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {items.map((item) => (
              <Menu.Item key={item.slug}>
                {({ active }) => (
                  <NavLink
                    onClick={setNavbar ? () => setNavbar(false) : undefined}
                    to={item.slug}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {item.text}
                  </NavLink>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
