import { useState, useEffect } from "react";
import {
  Download,
  FileText,
  BarChart2,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  format,
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfYear,
} from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = [
  "#1a1a1a",
  "#b8860b",
  "#6b6b6b",
  "#3a3a3a",
  "#c9a84c",
  "#888",
  "#444",
];

export default function ReportsAdmin() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState(
    format(startOfYear(new Date()), "yyyy-MM-dd"),
  );
  const [dateTo, setDateTo] = useState(format(new Date(), "yyyy-MM-dd"));
  const [reportType, setReportType] = useState("monthly");

  // useEffect(() => {
  //   base44.entities.Donation.list('-created_date', 1000)
  //     .then(d => setDonations(d.filter(x => x.status === 'completed')))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      const fake = fakeDonations.filter((x) => x.status === "completed");
      setDonations(fake);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = donations.filter((d) => {
    if (!d.created_date) return false;
    const date = new Date(d.created_date);
    return date >= new Date(dateFrom) && date <= new Date(dateTo + "T23:59:59");
  });

  const totalAmount = filtered.reduce((s, d) => s + (d.amount || 0), 0);
  const avgDonation = filtered.length ? totalAmount / filtered.length : 0;
  const recurringCount = filtered.filter((d) => d.is_recurring).length;
  const anonCount = filtered.filter((d) => d.is_anonymous).length;

  // Monthly breakdown
  const monthlyData = (() => {
    const map = {};
    filtered.forEach((d) => {
      const key = format(new Date(d.created_date), "MMM yyyy");
      map[key] = (map[key] || 0) + (d.amount || 0);
    });
    return Object.entries(map).map(([month, amount]) => ({ month, amount }));
  })();

  // Category breakdown
  const categoryData = (() => {
    const map = {};
    filtered.forEach((d) => {
      const cat = d.purpose || "general";
      map[cat] = (map[cat] || 0) + (d.amount || 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  })();

  const exportPDF = () => {
    const categoryRows = categoryData
      .map(
        (c) =>
          `<tr><td style="padding:6px 12px">${c.name}</td><td style="padding:6px 12px">$${c.value.toLocaleString()}</td><td style="padding:6px 12px">${((c.value / totalAmount) * 100).toFixed(1)}%</td></tr>`,
      )
      .join("");
    const html = `
      <html><head><title>Financial Report — Madrasa Farooqia</title>
      <style>
        body{font-family:Georgia,serif;padding:40px;color:#111}
        h1{font-size:22px;margin-bottom:4px}
        .sub{color:#666;font-size:13px;margin-bottom:30px}
        .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:30px}
        .stat{background:#f5f5f5;padding:16px;border-radius:8px}
        .stat-val{font-size:22px;font-weight:bold}
        .stat-lbl{font-size:12px;color:#666;margin-top:4px}
        table{width:100%;border-collapse:collapse}
        th{background:#111;color:#fff;padding:8px 12px;text-align:left;font-size:12px}
        tr:nth-child(even){background:#f9f9f9}
        .watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:60px;color:rgba(0,0,0,0.04);font-family:Georgia,serif;pointer-events:none;z-index:0;white-space:nowrap}
      </style></head>
      <body>
        <div class="watermark">MADRASA FAROOQIA</div>
        <h1>📊 Financial Report — Madrasa Farooqia</h1>
        <div class="sub">Period: ${dateFrom} to ${dateTo} · Generated: ${format(new Date(), "PPPp")}</div>
        <div class="grid">
          <div class="stat"><div class="stat-val">$${totalAmount.toLocaleString()}</div><div class="stat-lbl">Total Raised</div></div>
          <div class="stat"><div class="stat-val">${filtered.length}</div><div class="stat-lbl">Total Donations</div></div>
          <div class="stat"><div class="stat-val">$${avgDonation.toFixed(0)}</div><div class="stat-lbl">Avg Donation</div></div>
          <div class="stat"><div class="stat-val">${recurringCount}</div><div class="stat-lbl">Recurring Donors</div></div>
        </div>
        <h2 style="font-size:16px;margin-bottom:12px">Donation by Category</h2>
        <table><thead><tr><th>Category</th><th>Amount</th><th>% of Total</th></tr></thead>
        <tbody>${categoryRows}</tbody></table>
      </body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
  };

  const exportCSV = () => {
    const rows = [
      ["Date Range", `${dateFrom} to ${dateTo}`],
      ["Total Raised", `$${totalAmount.toLocaleString()}`],
      ["Total Donations", filtered.length],
      [],
      ["Category", "Amount", "% of Total"],
      ...categoryData.map((c) => [
        c.name,
        c.value,
        `${((c.value / totalAmount) * 100).toFixed(1)}%`,
      ]),
      [],
      ["Month", "Amount"],
      ...monthlyData.map((m) => [m.month, m.amount]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${dateFrom}_to_${dateTo}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">
            Financial Reports
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Donation analytics, category breakdown, audit exports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download size={14} className="mr-2" />
            CSV
          </Button>
          <Button size="sm" onClick={exportPDF}>
            <FileText size={14} className="mr-2" />
            PDF Report
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            From Date
          </label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-auto"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            To Date
          </label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-auto"
          />
        </div>
        <div className="flex gap-2">
          {[
            {
              label: "This Month",
              action: () => {
                setDateFrom(format(startOfMonth(new Date()), "yyyy-MM-dd"));
                setDateTo(format(new Date(), "yyyy-MM-dd"));
              },
            },
            {
              label: "Last Month",
              action: () => {
                const lm = subMonths(new Date(), 1);
                setDateFrom(format(startOfMonth(lm), "yyyy-MM-dd"));
                setDateTo(format(endOfMonth(lm), "yyyy-MM-dd"));
              },
            },
            {
              label: "This Year",
              action: () => {
                setDateFrom(format(startOfYear(new Date()), "yyyy-MM-dd"));
                setDateTo(format(new Date(), "yyyy-MM-dd"));
              },
            },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="px-3 py-2 bg-secondary rounded-lg text-xs font-medium hover:bg-muted transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Raised", value: `$${totalAmount.toLocaleString()}` },
          { label: "Donations", value: filtered.length },
          { label: "Avg Donation", value: `$${avgDonation.toFixed(0)}` },
          { label: "Recurring", value: `${recurringCount} donors` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-5"
          >
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="font-playfair font-bold text-2xl text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        {/* Monthly Chart */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6">
          <h2 className="font-playfair font-bold text-lg text-foreground mb-5">
            Monthly Breakdown
          </h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v) => [`$${v.toLocaleString()}`, "Amount"]}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--foreground))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">
              No data for selected period
            </div>
          )}
        </div>

        {/* Category Pie */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="font-playfair font-bold text-lg text-foreground mb-5">
            By Category
          </h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={85}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                  fontSize={10}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">
              No data
            </div>
          )}
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-playfair font-bold text-lg text-foreground">
            Category Summary
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              {[
                "Category",
                "Total Amount",
                "% of Total",
                "Donations Count",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left font-semibold text-muted-foreground p-4 text-xs"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categoryData.map((c) => (
              <tr key={c.name} className="hover:bg-secondary/20">
                <td className="p-4 capitalize font-medium text-foreground">
                  {c.name}
                </td>
                <td className="p-4 font-playfair font-bold text-foreground">
                  ${c.value.toLocaleString()}
                </td>
                <td className="p-4 text-muted-foreground">
                  {totalAmount ? ((c.value / totalAmount) * 100).toFixed(1) : 0}
                  %
                </td>
                <td className="p-4 text-muted-foreground">
                  {
                    filtered.filter((d) => (d.purpose || "general") === c.name)
                      .length
                  }
                </td>
              </tr>
            ))}
            <tr className="bg-secondary/30 font-bold">
              <td className="p-4 text-foreground">Total</td>
              <td className="p-4 font-playfair text-foreground">
                ${totalAmount.toLocaleString()}
              </td>
              <td className="p-4 text-foreground">100%</td>
              <td className="p-4 text-foreground">{filtered.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const fakeDonations = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  donor_name: ["Ali", "Ahmed", "Sara", "Umar", "Fatima"][i % 5],
  donor_email: `user${i}@mail.com`,
  amount: 50 + i * 10,
  currency: "USD",
  purpose: ["general", "masjid", "education"][i % 3],
  status: "completed",
  is_recurring: i % 4 === 0,
  is_anonymous: i % 5 === 0,
  created_date: new Date(Date.now() - i * 86400000).toISOString(),
}));
