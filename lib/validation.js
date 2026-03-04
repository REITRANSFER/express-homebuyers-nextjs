const validAreaCodes = new Set(["201","202","203","205","206","207","208","209","210","212","213","214","215","216","217","218","219","220","223","224","225","226","228","229","231","234","239","240","248","251","252","253","254","256","260","262","267","269","270","272","274","276","279","281","283","301","302","303","304","305","307","308","309","310","312","313","314","315","316","317","318","319","320","321","323","325","326","327","330","331","332","334","336","337","339","340","341","346","347","351","352","360","361","364","369","380","385","386","401","402","404","405","406","407","408","409","410","412","413","414","415","416","417","419","423","424","425","430","432","434","435","440","442","443","445","447","448","458","463","464","469","470","475","478","479","480","484","501","502","503","504","505","507","508","509","510","512","513","515","516","517","518","520","530","531","534","539","540","541","551","557","559","561","562","563","564","567","570","571","573","574","575","580","585","586","601","602","603","605","606","607","608","609","610","612","614","615","616","617","618","619","620","623","626","628","629","630","631","636","640","641","646","650","651","657","659","660","661","662","667","669","678","680","681","682","689","701","702","703","704","706","707","708","712","713","714","715","716","717","718","719","720","724","725","726","727","728","731","732","734","737","740","743","747","754","757","760","762","763","764","765","769","770","772","773","774","775","779","781","785","786","801","802","803","804","805","806","808","810","812","813","814","815","816","817","818","820","828","830","831","832","835","838","840","843","845","847","848","850","854","856","857","858","859","860","862","863","864","865","870","872","878","901","903","904","906","907","908","909","910","912","913","914","915","916","917","918","919","920","925","928","929","930","931","934","936","937","938","940","941","943","945","947","949","951","952","954","956","959","970","971","972","973","975","978","979","980","984","985","986","989"]);

const disposableEmailDomains = new Set(["mailinator.com","guerrillamail.com","tempmail.com","throwaway.email","yopmail.com","sharklasers.com","guerrillamail.info","grr.la","guerrillamail.biz","guerrillamail.de","guerrillamail.net","guerrillamail.org","spam4.me","trashmail.com","trashmail.me","trashmail.net","mytemp.email","mohmal.com","tempail.com","dispostable.com","maildrop.cc","10minutemail.com","temp-mail.org","fakeinbox.com","mailnesia.com","getnada.com","emailondeck.com","33mail.com","harakirimail.com","jetable.org","meltmail.com","mailcatch.com","tempinbox.com","spamgourmet.com","mailexpire.com","incognitomail.org","getairmail.com","mailnull.com","safeemail.xyz","tempmailo.com","burnermail.io"]);

export function validatePhone(phoneStr) {
  const digits = phoneStr.replace(/\D/g, '').replace(/^1/, '');
  if (digits.length !== 10) return { valid: false, msg: 'Please enter a valid 10-digit US phone number.' };
  const area = digits.slice(0, 3);
  if (!validAreaCodes.has(area)) return { valid: false, msg: `That area code (${area}) doesn't appear to be valid. Please check your number.` };
  if (/^(\d)\1{9}$/.test(digits)) return { valid: false, msg: 'Please enter a real phone number.' };
  if (['1234567890', '0123456789', '9876543210'].includes(digits)) return { valid: false, msg: 'Please enter a real phone number.' };
  const exchange = digits.slice(3, 6);
  if (exchange === '555') return { valid: false, msg: 'Please enter a real phone number, not a 555 number.' };
  if (exchange.startsWith('0') || exchange.startsWith('1')) return { valid: false, msg: "That doesn't look like a valid phone number. Please check the number after your area code." };
  return { valid: true };
}

export function validateEmail(email) {
  if (!email || email.trim() === '') return { valid: true };
  email = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, msg: 'Please enter a valid email address.' };
  const domain = email.split('@')[1];
  if (disposableEmailDomains.has(domain)) return { valid: false, msg: 'Please use a real email address, not a temporary one.' };
  const fakePatterns = ['test@test', 'fake@fake', 'asdf@asdf', 'noemail@', 'spam@', 'junk@', 'nobody@nobody', 'aaa@aaa', 'abc@abc', 'example@example'];
  for (const pattern of fakePatterns) {
    if (email.startsWith(pattern)) return { valid: false, msg: 'Please enter your real email address.' };
  }
  return { valid: true };
}

export function formatPrice(value) {
  const v = value.replace(/[^0-9]/g, '');
  return v ? parseInt(v, 10).toLocaleString() : '';
}

export function formatPhone(value) {
  let v = value.replace(/\D/g, '');
  if (v.startsWith('1')) v = v.slice(1);
  if (v.length > 10) v = v.slice(0, 10);
  let f = '+1 ';
  if (v.length > 0) f += '(' + v.slice(0, 3);
  if (v.length >= 4) f += ') ' + v.slice(3, 6);
  if (v.length >= 7) f += '-' + v.slice(6, 10);
  return f;
}
