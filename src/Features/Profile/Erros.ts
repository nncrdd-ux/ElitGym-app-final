export type Erros = {
  nome?: string;
  email?: string;
  birthday?: string;
  password?: string;
  passwordconfirm?: string;
};

export function validar(nome: string, email: string, birthday: string, password: string, passwordconfirm: string): Erros {
  const e: Erros = {};

  if (nome.trim().length < 3) e.nome = 'O nome tem de ter pelo menos 3 letras.';
  
  if (!email.includes('@') || !email.includes('.')) e.email = 'Escreve um email válido.';
  
  if (!birthday.includes('/') || birthday.trim().length < 8) e.birthday = 'Escreve uma data válida (dd/mm/aaaa).';
  
  if (password.trim().length < 8) e.password = 'A password tem de ter pelo menos 8 caracteres.';
  
  if (passwordconfirm !== password) e.passwordconfirm = 'As passwords não coincidem.';

  return e;
}
