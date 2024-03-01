import { Outlet } from '@remix-run/react';
import { useOutletContext } from '@remix-run/react';
import { SanityContent } from '~/components/SanityContent';
import { MembershipDocument } from '~/types/membership';

export default function Virksomhed() {
  const {
    corporateMembershipTitle,
    corporateMembershipText,
    corporateMembershipEmail,
  } = useOutletContext<MembershipDocument>();

  const title =
    corporateMembershipTitle ||
    'Bliv virksomhedsmedlem af Det Danske Afrika Selskab i dag';

  return (
    <div className='grid md:grid-cols-8 gap-6 '>
      <div className=' col-span-4 space-y-4 md:pr-12'>
        <div className='corporate-membership-page space-y-2'>
          <h1 className='text-lg text-orange-400'>Virksomhedsmedlem</h1>

          <h2 className='text-2xl md:text-4xl '>{title}</h2>
          {corporateMembershipText && corporateMembershipText?.length > 0 ? (
            <SanityContent value={corporateMembershipText} />
          ) : (
            <>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Påbegynd jeres rejse med os i Det Danske Afrika Selskab ved at
                blive virksomhedsmedlem. Processen er enkel – udfyld blot og
                indsend formularen nedenfor. Sørg for at udfylde alle felter, og
                del de unikke erfaringer eller interesser, jeres firma har i
                Afrika. Jeres ansøgning vil blive gennemgået af vores
                bestyrelse, og I vil få besked, når den er godkendt.
              </p>
              <h3 className='text-2xl font-bold'>Hvorfor blive medlem?</h3>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                At blive en del af vores selskab betyder, at jeres firma
                tilslutter sig et netværk af virksomheder og individer, der
                deler jeres passion for Afrika. Uanset om det er kulturen,
                menneskene, landskaberne eller specifikke forretningsmuligheder,
                der tiltrækker jer, er vi her for at udforske og vokse sammen.
              </p>
              <h3 className='text-2xl font-bold'>Møder og sammenkomster</h3>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Vi arrangerer møder og sammenkomster til meget rimelige priser,
                under de samme fordelagtige vilkår og priser som for vores
                individuelle medlemmer. Detaljer og omkostninger vil blive
                oplyst med hver eventinvitation, så I altid ved, hvad I kan
                forvente.
              </p>
              <h3 className='text-2xl font-bold'>Medlemsgebyr</h3>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Det årlige medlemsgebyr for virksomhedsmedlemmer er tilpasset
                således, at op til fire medarbejdere fra jeres firma kan deltage
                i hvert af selskabets arrangementer. Dette gebyr muliggør vores
                bestræbelser på at organisere arrangementer og initiativer,
                hvilket tillader os at fortsætte med at tilbyde stor værdi til
                vores fællesskab.
              </p>
              <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Bliv medlem i dag og bliv en del af et selskab, der fejrer og
                lærer fra det diverse og rige tæppe, som er Afrika. Vi ser frem
                til at byde jer velkommen!
              </p>
              <p className='text-2xl'>Det årlige medlemskab er 5000 kr.</p>
            </>
          )}
        </div>
      </div>

      <div
        className=' col-span-4 md:-mt-32 -mx-2 p-2 md:pt-32  md:pr-32 md:-mr-32 h-min bg-fixed  '
        style={{
          backgroundImage:
            //"url('https://cdn.midjourney.com/3aa676ab-27e9-4b9c-abcd-0e0ab8768ecb/0_0.webp')",
            "url('https://cdn.midjourney.com/f66f6abb-d982-45ef-b03f-d13b30126620/0_1.webp')",
          width: 'auto',
          height: '100%',
        }}
      >
        <Outlet context={corporateMembershipEmail} />
      </div>
    </div>
  );
}
