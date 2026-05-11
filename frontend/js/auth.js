import { supabase } from './supabase.js';

const form = document.getElementById('loginForm');
const registerBtn = document.getElementById('registerBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = 'dashboard.html';
});

registerBtn.addEventListener('click', async () => {

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert('Cuenta creada correctamente');
});