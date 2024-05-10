const Whoami = () => {
  const birthdayISO = import.meta.env.VITE_BIRTHDAY_ISO;
  const name = import.meta.env.VITE_NAME;
  const degree = import.meta.env.VITE_DEGREE;
  const email = import.meta.env.VITE_EMAIL;
  const tel = import.meta.env.VITE_TEL;
  const telegram = import.meta.env.VITE_TELEGRAM;
  const github = import.meta.env.VITE_GITHUB;

  const now = new Date().getTime();
  const birthday = new Date(birthdayISO).getTime();
  const age = Math.floor((now - birthday) / (1000 * 60 * 60 * 24 * 365.25));

  return (
    <pre>
      Name:            { name }<br />
      Age:             { age }<br />
      Degree:          { degree }<br />
      Tel:             <a target="_blank" href={ 'tel:' + tel }>{ tel }</a><br />
      Email:           <a target="_blank" href={ 'mailto:' + email }>{ email }</a><br />
      Telegram:        <a target="_blank" href={ 'https://t.me/' + telegram }>{ telegram }</a><br />
      Github:          <a target="_blank" href={ 'https://github.com/' + github }>Github Link</a><br />
    </pre>
  )
}

export default Whoami
