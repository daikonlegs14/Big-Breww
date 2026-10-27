import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DRINKS_FILE = path.join(DATA_DIR, 'drinks.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed users
const INITIAL_USERS = [
  {
    id: 'usr_admin_1',
    name: 'Carlos Mendoza',
    email: 'manager@bigbrew.com',
    password: 'manager123',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_cust_1',
    name: 'Alyssa Rivera',
    email: 'customer@bigbrew.com',
    password: 'coffee123',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
];

// Initial default signature drinks
const INITIAL_DRINKS = [
  {
    id: 'drk_spanish_latte',
    name: 'Spanish Sweet Latte',
    category: 'Signature Espresso',
    price: 39.00,
    description: 'Our #1 bestseller. Velvety steamed milk and condensed dulce sweetness topped with a double ristretto shot of our signature dark roast blend.',
    tastingNotes: ['Sweet Condensed Cream', 'Caramelized Sugar', 'Dark Cocoa Finish'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'both',
    image: '/src/assets/images/drink_spanish_latte_1793080056309.jpg',
    isSignature: true,
    isAvailable: true,
    caffeineLevel: 'high',
    createdAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'drk_matcha_espresso',
    name: 'Dirty Uji Matcha Fusion',
    category: 'Specialty Fusion',
    price: 49.00,
    description: 'Ceremonial grade Uji Japanese green matcha shaken with iced whole milk and crowned with a fresh layer of hot espresso crema.',
    tastingNotes: ['Earthy Matcha', 'Creamy Milk', 'Bold Espresso Crema'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'iced',
    image: '/src/assets/images/drink_matcha_espresso_1793080057192.jpg',
    isSignature: true,
    isAvailable: true,
    caffeineLevel: 'high',
    createdAt: '2026-10-02T08:00:00.000Z',
  },
  {
    id: 'drk_brown_sugar_latte',
    name: 'Muscovado Brown Sugar Latte',
    category: 'Iced Specialties',
    price: 45.00,
    description: 'Slow-simmered artisanal Philippine Muscovado syrup layered with fresh milk, iced espresso, and golden sugar crystal crunch.',
    tastingNotes: ['Molasses Toffee', 'Warm Vanilla', 'Smoked Amber Roast'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'iced',
    image: '/src/assets/images/drink_brown_sugar_boba_1793080057482.jpg',
    isSignature: true,
    isAvailable: true,
    caffeineLevel: 'medium',
    createdAt: '2026-10-03T08:00:00.000Z',
  },
  {
    id: 'drk_dark_mocha',
    name: 'Big Brew Dark Mocha Velvet',
    category: 'Signature Espresso',
    price: 42.00,
    description: 'Intense Dutch processed dark chocolate folded into rich full-bodied espresso and fresh velvety microfoam.',
    tastingNotes: ['Dutch Cocoa', 'Dark Cherry', 'Roasted Hazelnut'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'both',
    image: '/src/assets/images/drink_spanish_latte_1793080056309.jpg',
    isSignature: true,
    isAvailable: true,
    caffeineLevel: 'high',
    createdAt: '2026-10-04T08:00:00.000Z',
  },
  {
    id: 'drk_salted_caramel',
    name: 'Salted Caramel Macchiato',
    category: 'Signature Espresso',
    price: 45.00,
    description: 'Fresh milk infused with French vanilla, marked with intense espresso and cross-hatched with slow-cooked sea salt caramel.',
    tastingNotes: ['Vanilla Bean', 'Sea Salt', 'Buttery Caramel'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'both',
    isSignature: true,
    image: '/src/assets/images/hero_bigbrew_coffee_1793080056399.jpg',
    isAvailable: true,
    caffeineLevel: 'medium',
    createdAt: '2026-10-05T08:00:00.000Z',
  },
  {
    id: 'drk_cold_brew',
    name: 'Slow Steeped Amber Cold Brew',
    category: 'Cold Brew & Refreshers',
    price: 40.00,
    description: 'Steeped for 18 hours in cold filtered mountain water. Ultra-smooth, naturally sweet, with ultra-low acidity and high caffeine punch.',
    tastingNotes: ['Dark Chocolate', 'Nutmeg', 'Smooth Stone Fruit'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'iced',
    image: '/src/assets/images/craft_coffee_beans_1793080058148.jpg',
    isSignature: false,
    isAvailable: true,
    caffeineLevel: 'high',
    createdAt: '2026-10-06T08:00:00.000Z',
  },
  {
    id: 'drk_strawberry_latte',
    name: 'Strawberry Cloud Latte',
    category: 'Specialty Fusion',
    price: 48.00,
    description: 'Real crushed strawberry compote topped with creamy farm milk and an optional light espresso float for the ultimate refreshing lift.',
    tastingNotes: ['Wild Berry', 'Sweet Cream', 'Subtle Coffee Aroma'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'iced',
    image: '/src/assets/images/drink_brown_sugar_boba_1793080057482.jpg',
    isSignature: false,
    isAvailable: true,
    caffeineLevel: 'low',
    createdAt: '2026-10-07T08:00:00.000Z',
  },
  {
    id: 'drk_white_choco',
    name: 'Kape Tisoy (White Choco Espresso)',
    category: 'Signature Espresso',
    price: 42.00,
    description: 'The Big Brew crowd-favorite White Chocolate espresso blend. Smooth creamy sweetness paired with freshly ground robusta beans.',
    tastingNotes: ['Creamy White Chocolate', 'Warm Malt', 'Bold Robusta'],
    sizes: ['Grande 16oz', 'Venti 22oz'],
    temperature: 'both',
    image: '/src/assets/images/hero_bigbrew_coffee_1793080056399.jpg',
    isSignature: true,
    isAvailable: true,
    caffeineLevel: 'high',
    createdAt: '2026-10-08T08:00:00.000Z',
  },
];

// Helper functions for JSON file persistence
function readUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(INITIAL_USERS, null, 2), 'utf-8');
      return INITIAL_USERS;
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    return INITIAL_USERS;
  }
}

function writeUsers(users: any[]) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

function readDrinks() {
  try {
    if (!fs.existsSync(DRINKS_FILE)) {
      fs.writeFileSync(DRINKS_FILE, JSON.stringify(INITIAL_DRINKS, null, 2), 'utf-8');
      return INITIAL_DRINKS;
    }
    const data = fs.readFileSync(DRINKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading drinks file:', err);
    return INITIAL_DRINKS;
  }
}

function writeDrinks(drinks: any[]) {
  fs.writeFileSync(DRINKS_FILE, JSON.stringify(drinks, null, 2), 'utf-8');
}

// Initialize seed data on startup if not present
readUsers();
readDrinks();

// Auth Middleware
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const users = readUsers();
  
  // Token format: "token_{userId}_{role}_{timestamp}"
  if (token.startsWith('token_')) {
    const raw = token.slice(6); // remove "token_"
    // Find the matching user whose id matches the start
    const user = users.find((u: any) => raw.startsWith(u.id));
    if (user) {
      (req as any).user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
  }
  next();
}

app.use(authMiddleware);

// --- API ROUTES ---

// 1. Auth: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const users = readUsers();
  const user = users.find(
    (u: any) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password. Please check your credentials.' });
  }

  const token = `token_${user.id}_${user.role}_${Date.now()}`;
  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// 2. Auth: Register
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter a valid full name (at least 2 characters).' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const users = readUsers();
  const existing = users.find((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: 'customer',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  const token = `token_${newUser.id}_${newUser.role}_${Date.now()}`;
  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

// 3. Auth: Current User Me
app.get('/api/auth/me', (req: Request, res: Response) => {
  const currentUser = (req as any).user;
  if (!currentUser) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  return res.json({ user: currentUser });
});

// 4. Drinks CRUD: READ All (Public)
app.get('/api/drinks', (_req: Request, res: Response) => {
  const drinks = readDrinks();
  return res.json({ drinks });
});

// 5. Drinks CRUD: CREATE (Admin/Manager only)
app.post('/api/drinks', (req: Request, res: Response) => {
  const currentUser = (req as any).user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied: Manager / Admin role required to create drinks.' });
  }

  const {
    name,
    category,
    price,
    description,
    tastingNotes,
    sizes,
    temperature,
    image,
    isSignature,
    isAvailable,
    caffeineLevel,
  } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Drink name must be at least 2 characters.' });
  }
  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    return res.status(400).json({ error: 'Category is required.' });
  }
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({ error: 'Price must be a valid number greater than 0.' });
  }
  if (!description || typeof description !== 'string' || description.trim().length < 5) {
    return res.status(400).json({ error: 'Description must be at least 5 characters long.' });
  }

  const drinks = readDrinks();
  const newDrink = {
    id: `drk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    category: category.trim(),
    price: Math.round(numericPrice * 100) / 100,
    description: description.trim(),
    tastingNotes: Array.isArray(tastingNotes)
      ? tastingNotes.filter(Boolean)
      : typeof tastingNotes === 'string'
      ? tastingNotes.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Freshly Brewed'],
    sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ['Grande 16oz', 'Venti 22oz'],
    temperature: temperature || 'both',
    image: image?.trim() || '/src/assets/images/hero_bigbrew_coffee_1793080056399.jpg',
    isSignature: Boolean(isSignature),
    isAvailable: isAvailable !== false,
    caffeineLevel: caffeineLevel || 'medium',
    createdAt: new Date().toISOString(),
  };

  drinks.unshift(newDrink);
  writeDrinks(drinks);

  return res.status(201).json({ drink: newDrink, message: 'Drink successfully created.' });
});

// 6. Drinks CRUD: UPDATE (Admin/Manager only)
app.put('/api/drinks/:id', (req: Request, res: Response) => {
  const currentUser = (req as any).user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied: Manager / Admin role required to update drinks.' });
  }

  const { id } = req.params;
  const drinks = readDrinks();
  const index = drinks.findIndex((d: any) => d.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Drink not found.' });
  }

  const {
    name,
    category,
    price,
    description,
    tastingNotes,
    sizes,
    temperature,
    image,
    isSignature,
    isAvailable,
    caffeineLevel,
  } = req.body;

  // Validation
  if (name !== undefined && (typeof name !== 'string' || name.trim().length < 2)) {
    return res.status(400).json({ error: 'Drink name must be at least 2 characters.' });
  }
  if (category !== undefined && (typeof category !== 'string' || category.trim().length === 0)) {
    return res.status(400).json({ error: 'Category cannot be empty.' });
  }
  if (price !== undefined) {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ error: 'Price must be a valid number greater than 0.' });
    }
  }
  if (description !== undefined && (typeof description !== 'string' || description.trim().length < 5)) {
    return res.status(400).json({ error: 'Description must be at least 5 characters long.' });
  }

  const existing = drinks[index];
  const updatedDrink = {
    ...existing,
    name: name !== undefined ? name.trim() : existing.name,
    category: category !== undefined ? category.trim() : existing.category,
    price: price !== undefined ? Math.round(parseFloat(price) * 100) / 100 : existing.price,
    description: description !== undefined ? description.trim() : existing.description,
    tastingNotes: tastingNotes !== undefined
      ? (Array.isArray(tastingNotes)
          ? tastingNotes.filter(Boolean)
          : typeof tastingNotes === 'string'
          ? tastingNotes.split(',').map((s) => s.trim()).filter(Boolean)
          : existing.tastingNotes)
      : existing.tastingNotes,
    sizes: sizes !== undefined && Array.isArray(sizes) && sizes.length > 0 ? sizes : existing.sizes,
    temperature: temperature !== undefined ? temperature : existing.temperature,
    image: image !== undefined ? image.trim() : existing.image,
    isSignature: isSignature !== undefined ? Boolean(isSignature) : existing.isSignature,
    isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : existing.isAvailable,
    caffeineLevel: caffeineLevel !== undefined ? caffeineLevel : existing.caffeineLevel,
    updatedAt: new Date().toISOString(),
  };

  drinks[index] = updatedDrink;
  writeDrinks(drinks);

  return res.json({ drink: updatedDrink, message: 'Drink updated successfully.' });
});

// 7. Drinks CRUD: DELETE (Admin/Manager only)
app.delete('/api/drinks/:id', (req: Request, res: Response) => {
  const currentUser = (req as any).user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'Permission denied: Manager / Admin role required to delete drinks.' });
  }

  const { id } = req.params;
  const drinks = readDrinks();
  const index = drinks.findIndex((d: any) => d.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Drink not found.' });
  }

  const deletedDrink = drinks.splice(index, 1)[0];
  writeDrinks(drinks);

  return res.json({ message: `Successfully deleted "${deletedDrink.name}".`, deletedId: id });
});

// 8. Reset Drinks to Seed (Admin/Manager or reset helper)
app.post('/api/drinks/reset', (req: Request, res: Response) => {
  const currentUser = (req as any).user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'Manager role required to reset menu.' });
  }
  writeDrinks(INITIAL_DRINKS);
  return res.json({ drinks: INITIAL_DRINKS, message: 'Menu reset to default signature drinks.' });
});

// --- Server & Vite Integration ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Big Brew Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
