// Sistema de autenticação mock (em produção, usar backend real)

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  onboardingCompleted: boolean;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: Date;
}

// Simula localStorage seguro
const AUTH_KEY = 'evoluir_auth_session';
const USERS_KEY = 'evoluir_users';

// Funções auxiliares
const getUsers = (): Record<string, any> => {
  if (typeof window === 'undefined') return {};
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

const saveUsers = (users: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getSession = (): AuthSession | null => {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  
  const parsed = JSON.parse(session);
  const expiresAt = new Date(parsed.expiresAt);
  
  // Verifica se sessão expirou
  if (expiresAt < new Date()) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
  
  return {
    ...parsed,
    expiresAt,
    user: {
      ...parsed.user,
      createdAt: new Date(parsed.user.createdAt)
    }
  };
};

const saveSession = (session: AuthSession) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
};

// Funções principais
export const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getUsers();
  
  // Verifica se email já existe
  if (users[email]) {
    return { success: false, error: 'Email já cadastrado' };
  }
  
  // Cria novo usuário
  const user: AuthUser = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    createdAt: new Date(),
    onboardingCompleted: false
  };
  
  users[email] = {
    ...user,
    password // Em produção, usar hash
  };
  
  saveUsers(users);
  
  return { success: true, user };
};

export const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; session?: AuthSession }> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getUsers();
  const userData = users[email];
  
  if (!userData || userData.password !== password) {
    return { success: false, error: 'Email ou senha incorretos' };
  }
  
  // Cria sessão
  const session: AuthSession = {
    user: {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      createdAt: new Date(userData.createdAt),
      onboardingCompleted: userData.onboardingCompleted || false
    },
    token: Math.random().toString(36).substr(2, 20),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
  };
  
  saveSession(session);
  
  return { success: true, session };
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentSession = (): AuthSession | null => {
  return getSession();
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

export const updateOnboardingStatus = (completed: boolean) => {
  const session = getSession();
  if (!session) return;
  
  // Atualiza usuário
  const users = getUsers();
  if (users[session.user.email]) {
    users[session.user.email].onboardingCompleted = completed;
    saveUsers(users);
  }
  
  // Atualiza sessão
  session.user.onboardingCompleted = completed;
  saveSession(session);
};

export const requestPasswordReset = async (email: string): Promise<{ success: boolean; message: string }> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getUsers();
  
  if (!users[email]) {
    // Por segurança, não revela se email existe
    return { 
      success: true, 
      message: 'Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.' 
    };
  }
  
  // Em produção, enviar email real
  console.log(`Email de recuperação enviado para: ${email}`);
  
  return { 
    success: true, 
    message: 'Email de recuperação enviado com sucesso!' 
  };
};
