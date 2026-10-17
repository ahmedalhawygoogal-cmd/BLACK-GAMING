-- ==============================================================================
-- BLACK GAMING - Supabase Database Schema
-- Games, Products, and Orders for Game Top-up Platform
-- ==============================================================================

-- 1. Create Games Table
CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    region TEXT DEFAULT 'MENA',
    description TEXT,
    icon TEXT,
    banner_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('gold', 'battle_pass', 'item', 'bundle')),
    amount INTEGER DEFAULT 0,
    price NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EGP' NOT NULL,
    is_popular BOOLEAN DEFAULT false,
    badge TEXT,
    sort_order INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code TEXT UNIQUE NOT NULL DEFAULT ('BG-' || upper(substr(md5(random()::text), 1, 8))),
    game_id UUID REFERENCES public.games(id),
    product_id UUID REFERENCES public.products(id),
    player_id TEXT NOT NULL,
    player_name TEXT,
    contact_phone TEXT,
    total_amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'EGP' NOT NULL,
    payment_method TEXT DEFAULT 'whatsapp',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 4. Enable Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Games Policies: Public read access
CREATE POLICY "Allow public read access to active games"
    ON public.games
    FOR SELECT
    USING (is_active = true);

-- Products Policies: Public read access
CREATE POLICY "Allow public read access to available products"
    ON public.products
    FOR SELECT
    USING (is_available = true);

-- Orders Policies: Anyone can insert an order, read by order code / ID
CREATE POLICY "Allow public insert to orders"
    ON public.orders
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public select of own order"
    ON public.orders
    FOR SELECT
    USING (true);

-- ==============================================================================
-- 5. Seed Data: Blood Strike (MENA) & Product Packages
-- ==============================================================================

-- Insert Blood Strike Game
INSERT INTO public.games (id, slug, name, region, description, icon)
VALUES (
    'e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d',
    'blood-strike',
    'Blood Strike',
    'MENA',
    'شحن فوري لجولد وباتل باس لعبة بلود سترايك سيرفر الشرق الأوسط وشمال أفريقيا (MENA) بأسعار تنافسية وتسليم لحظي.',
    'Crosshair'
)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    region = EXCLUDED.region,
    description = EXCLUDED.description;

-- Insert Blood Strike Products (Currency: EGP)
INSERT INTO public.products (game_id, name, category, amount, price, currency, is_popular, badge, sort_order)
VALUES
    -- Gold Packages
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'جولد 50', 'gold', 50, 25.00, 'EGP', false, NULL, 1),
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'جولد 105', 'gold', 105, 50.00, 'EGP', false, NULL, 2),
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'جولد 320', 'gold', 320, 140.00, 'EGP', true, 'الأكثر طلباً 🔥', 3),
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'جولد 540', 'gold', 540, 230.00, 'EGP', false, NULL, 4),
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'جولد 1100', 'gold', 1100, 430.00, 'EGP', true, 'أفضل قيمة 💎', 5),
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'جولد 2260', 'gold', 2260, 840.00, 'EGP', false, NULL, 6),
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'جولد 5800', 'gold', 5800, 2100.00, 'EGP', false, 'باقة الحيتان 👑', 7),
    
    -- Battle Pass Packages
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'باتل باس نخبة عادي', 'battle_pass', 0, 200.00, 'EGP', false, 'Elite Pass', 8),
    ('e7c2f6d8-4b2a-431e-9134-8b6c0e2a1f9d', 'باتل باس نخبة مميز', 'battle_pass', 0, 400.00, 'EGP', true, 'Premium Elite', 9);
