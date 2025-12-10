import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PriceChartProps {
  data: { date: string; price: number }[];
}

export function PriceChart({ data }: PriceChartProps) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border card-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Price History</h3>
        <div className="flex gap-2">
          {["1D", "1W", "1M", "1Y"].map((period) => (
            <button
              key={period}
              className="px-3 py-1 text-sm rounded-md bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35 100% 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(35 100% 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                padding: "12px",
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(35 100% 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
