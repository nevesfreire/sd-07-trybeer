export default function data(date) {
  const inicioMes = 5;
  const finalMes = 7;
  const inicioDia = 8;
  const finalDia = 10;
  const mes = date.slice(inicioMes, finalMes);
  const dia = date.slice(inicioDia, finalDia);
  return `${dia}/${mes}`;
}
