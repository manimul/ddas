import { Outlet } from '@remix-run/react';
import { useOutletContext } from '@remix-run/react';
import { SanityContent } from '~/components/SanityContent';
import { MembershipDocument } from '~/types/membership';

export default function Personligt() {
  const {
    personalMembershipEmail,
    personalMembershipText,
    personalMembershipTitle,
  } = useOutletContext<MembershipDocument>();
  const title =
    personalMembershipTitle || 'Bliv medlem af Det Danske Afrika Selskab i dag';

  return (
    <div className='grid md:grid-cols-8 gap-6 '>
      <div className=' col-span-4 space-y-4 md:pr-12'>
        <div className='membership-page space-y-2'>
          <h1 className='text-lg text-orange-400'>Personligt Medlem</h1>
          <h2 className='text-2xl md:text-4xl '>{title}</h2>
          {personalMembershipText && personalMembershipText?.length > 0 ? (
            <SanityContent value={personalMembershipText} />
          ) : (
            <>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Påbegynd din rejse med os i Det Danske Afrika Selskab ved at
                blive personligt medlem. Det er en enkel proces – udfyld blot og
                indsend formularen nedenfor. Sørg for at udfylde hver sektion,
                og glem ikke at dele dine unikke oplevelser med og passion for
                Afrika. Din ansøgning vil blive gennemgået af vores bestyrelse,
                og vi vil give dig besked, når den er godkendt.
              </p>
              <h3 className='text-2xl font-bold'>Hvorfor blive medlem?</h3>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                At være en del af vores selskab betyder, at du tilslutter dig et
                fællesskab af individer, der deler din interesse for Afrika.
                Uanset om det er kulturen, menneskene, landskaberne eller
                specifikke oplevelser, der trækker dig, er vi her for at
                udforske det sammen.
              </p>
              <h3 className='text-2xl font-bold'>Møder og sammenkomster</h3>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Vi arrangerer møder og sammenkomster til meget rimelige priser.
                Detaljer og omkostninger vil blive oplyst med hver
                eventinvitation, så du altid ved, hvad du kan forvente.
              </p>
              <h3 className='text-2xl font-bold'>Medlemsgebyr</h3>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Det årlige medlemsgebyr er kun 250 DKK per medlem. Dette
                nominelle gebyr hjælper os med at dække omkostningerne ved vores
                arrangementer og initiativer, så vi kan fortsætte med at tilbyde
                stor værdi til vores fællesskab.
              </p>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Bliv medlem i dag og vær en del af et selskab, der fejrer og
                lærer fra det diverse og rige tæppe, som er Afrika. Vi glæder os
                til at byde dig velkommen!
              </p>
              <p className='text-2xl'>
                {' '}
                Det årlige kontingent er kr. 250 per medlem
              </p>
            </>
          )}
        </div>
      </div>
      <div
        className=' col-span-4 md:-mt-32 -mx-2 p-2 md:pt-32  md:pr-32 md:-mr-32 h-min bg-fixed  '
        style={{
          backgroundImage:
            // "url('https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp')",
            "url('https://cdn.midjourney.com/e6d4632b-1c50-4525-b392-199df930b91a/0_0.webp')",

          width: 'auto',
          height: '100%',
        }}
      >
        <Outlet context={personalMembershipEmail} />
      </div>
    </div>
  );
}
