import {
  ActionFunctionArgs,
  ActionFunction,
  json,
  MetaFunction,
} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useMatches } from '@remix-run/react';

import type { Loader as RootLoader, loader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';

import { z } from 'zod';
import { BasicContactDocument, basicContactZ } from '~/types/basicContact';

export function Register() {
  //const homeEmail = home?.email ?? 'default@example.com';

  return (
    <Form className=' max-w-md ' method='post'>
      <input type='hidden' name='formType' value='registerEvent' />

      <fieldset className='space-y-4'>
        <div>
          <label htmlFor='name' className='sr-only'>
            Navn
          </label>
          <input type='hidden' name='homeEmail' value={'mark@bambwa.com'} />

          <input
            type='text'
            name='navn'
            required
            className='w-full rounded-lg border-gray-200 bg-gray-50 placeholder-gray-600 text-gray-600 p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast navn'
          />
        </div>
        <div>
          <label htmlFor='email' className='sr-only'>
            E-mail
          </label>
          <input
            type='email'
            name='email'
            required
            className='w-full rounded-lg border-gray-200 placeholder-gray-600 bg-gray-50 p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast e-mail'
          />
        </div>
        <div className='flex flex-row text-gray-400 space-x-2 px-4 py-2'>
          <label htmlFor='medlemskab' className='  '>
            Er du medlem?
          </label>

          <input
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            type='radio'
            id='medlemskab-1'
            name='medlemskab'
            value='ja'
          />
          <label htmlFor='medlemskab-1'>Ja</label>
          <input
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            type='radio'
            id='medlemskab-2'
            name='medlemskab'
            value='nej'
          />
          <label htmlFor='medlemskab-2'>Nej</label>
        </div>
        <div>
          <label htmlFor='guests' className='sr-only'>
            Antal gæster
          </label>
          <input
            type='number'
            name='guests'
            className='w-full rounded-lg border-gray-200 bg-gray-50 placeholder-gray-600 p-4 pe-12 text-sm shadow-sm'
            placeholder='Antal gæster - om nogen'
          />
        </div>

        <button
          type='submit'
          className='ml-auto uppercase text-sm font-bold rounded-md p-4 tracking-wide opacity-75   bg-gradient-to-br   border-[#FF5107] border-2 text-black dark:text-white hover:opacity-100 hover:rounded-[30px]  duration-500     '
        >
          Tilmeld
        </button>
      </fieldset>
    </Form>
  );
}
