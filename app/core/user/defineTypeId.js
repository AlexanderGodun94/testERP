function defineTypeId(id) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (emailRegex.test(id)) return 'EMAIL';
  else if (phoneRegex.test(id)) return 'PHONE';
  return null;
}

module.exports = defineTypeId;
