import { supabase } from './supabase.js';

const saldoElement = document.getElementById('saldo');
const logoutBtn = document.getElementById('logoutBtn');

const depositBtn = document.getElementById('depositBtn');
const depositoInput = document.getElementById('depositoInput');

const movimientosContainer = document.getElementById(
  'movimientosContainer'
);

let cuentaActual = null;

async function cargarCuenta() {

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  console.log('USUARIO:', user);
  console.log('ERROR USER:', userError);

  if (!user) {
    window.location.href = '/frontend/index.html';
    return;
  }

  const { data, error } = await supabase
    .from('cuentas')
    .select('*')
    .eq('user_id', user.id)
    .single();

  console.log('CUENTA:', data);
  console.log('ERROR CUENTA:', error);

  if (error) {
    alert(error.message);
    return;
  }

  cuentaActual = data;

  saldoElement.textContent = `$${Number(data.saldo).toLocaleString()}`;

  cargarMovimientos();
}

async function cargarMovimientos() {

  if (!cuentaActual) return;

  const { data, error } = await supabase
    .from('movimientos')
    .select('*')
    .eq('cuenta_id', cuentaActual.id)
    .order('created_at', { ascending: false });

  console.log('MOVIMIENTOS:', data);
  console.log('ERROR MOVIMIENTOS:', error);

  if (error) {
    console.error(error);
    return;
  }

  movimientosContainer.innerHTML = '';

  if (data.length === 0) {

    movimientosContainer.innerHTML = `
      <p class="text-zinc-500">
        No hay movimientos todavía.
      </p>
    `;

    return;
  }

  data.forEach((mov) => {

    const positivo =
      mov.tipo === 'deposito';

    movimientosContainer.innerHTML += `

      <div class="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 flex items-center justify-between">

        <div>
          <p class="font-bold text-lg capitalize">
            ${mov.tipo}
          </p>

          <p class="text-zinc-400 text-sm">
            ${new Date(mov.created_at).toLocaleString()}
          </p>
        </div>

        <span class="${
          positivo
            ? 'text-emerald-400'
            : 'text-red-400'
        } font-black text-xl">

          ${positivo ? '+' : '-'}$${Number(mov.monto).toLocaleString()}

        </span>

      </div>

    `;
  });
}

depositBtn.addEventListener('click', async () => {

  const monto = Number(depositoInput.value);

  if (monto <= 0) {
    alert('Monto inválido');
    return;
  }

  const { error } = await supabase.rpc(
    'depositar',
    {
      cuenta_uuid: cuentaActual.id,
      monto: monto
    }
  );

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  depositoInput.value = '';

  alert('Depósito realizado correctamente');

  cargarCuenta();
});

logoutBtn.addEventListener('click', async () => {

  await supabase.auth.signOut();

  window.location.href = '/frontend/index.html';
});

cargarCuenta();