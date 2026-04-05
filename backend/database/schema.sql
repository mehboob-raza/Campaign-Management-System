CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  client TEXT NOT NULL,
  status TEXT CHECK (status IN ('active','paused','completed')),
  budget NUMERIC,
  spend NUMERIC,
  impressions INT,
  clicks INT,
  conversions INT,
  created_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  campaign_id UUID,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);