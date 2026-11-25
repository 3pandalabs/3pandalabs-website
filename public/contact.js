// The contact form: one POST to AdVault's API, which emails it to
// 3pandas@3pandalabs.com and stores nothing. Hidden without JavaScript.
(function () {
  var form = document.getElementById('contact-form');
  var error = document.getElementById('c-error');
  var sent = document.getElementById('c-sent');
  var button = form.querySelector('button');
  form.hidden = false;

  function fail(text) {
    error.textContent = text;
    error.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    error.hidden = true;
    var body = { site: '3pandalabs' };
    ['name', 'email', 'subject', 'message'].forEach(function (k) { body[k] = form.elements[k].value; });
    if (form.elements.website.value) body.website = form.elements.website.value;
    button.disabled = true;
    button.textContent = 'Sending…';
    fetch('https://api.advault.3pandalabs.com/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        if (res.ok) {
          sent.textContent = "Thanks, your message was sent. We'll reply to " + body.email + '.';
          sent.hidden = false;
          form.reset();
          form.hidden = true;
        } else if (res.status === 429) fail('Too many messages right now. Please try again in an hour, or email 3pandas@3pandalabs.com.');
        else if (res.status === 400) fail('Please check your name, email, subject and message.');
        else fail("We couldn't send your message. Please email 3pandas@3pandalabs.com instead.");
      })
      .catch(function () { fail("We couldn't send your message. Check your connection, or email 3pandas@3pandalabs.com."); })
      .then(function () {
        button.disabled = false;
        button.textContent = 'Send';
      });
  });
})();
