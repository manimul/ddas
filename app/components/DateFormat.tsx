export function DateFormat({ date }: { date: any }) {
  return (
    <div>
      <span className='text-xl opacity-40'>
        {new Date(date).toLocaleDateString('da-DK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );
}
