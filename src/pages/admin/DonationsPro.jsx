import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Filter,
  DollarSign,
  FileText,
  QrCode,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { generateReceiptId, downloadReceipt } from "@/lib/receiptGenerator";

export default function DonationsPro() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // useEffect(() => {
  //   base44.entities.Donation.list('-created_date', 500)
  //     .then(setDonations).finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setDonations(fakeDonations);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = donations.filter((d) => {
    const matchSearch =
      !search ||
      (d.donor_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.donor_email || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.receipt_id || "").toLowerCase().includes(search.toLowerCase());
    const matchPurpose = purposeFilter === "all" || d.purpose === purposeFilter;
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    const matchFrom =
      !dateFrom || new Date(d.created_date) >= new Date(dateFrom);
    const matchTo =
      !dateTo || new Date(d.created_date) <= new Date(dateTo + "T23:59:59");
    return matchSearch && matchPurpose && matchStatus && matchFrom && matchTo;
  });

  const totalRaised = filtered
    .filter((d) => d.status === "completed")
    .reduce((s, d) => s + (d.amount || 0), 0);
  const purposes = [
    ...new Set(donations.map((d) => d.purpose).filter(Boolean)),
  ];

  const exportCSV = () => {
    const rows = [
      [
        "Receipt ID",
        "Donor",
        "Email",
        "Amount",
        "Currency",
        "Purpose",
        "Status",
        "Recurring",
        "Date",
      ],
      ...filtered.map((d) => [
        generateReceiptId(d),
        d.is_anonymous ? "Anonymous" : d.donor_name || "",
        d.donor_email || "",
        d.amount,
        d.currency || "USD",
        d.purpose || "general",
        d.status,
        d.is_recurring ? `Yes (${d.recurring_frequency})` : "No",
        d.created_date
          ? format(new Date(d.created_date), "yyyy-MM-dd HH:mm")
          : "",
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations_${format(new Date(), "yyyyMMdd")}.csv`;
    a.click();
  };

  const exportPDF = async () => {
    const rows = filtered
      .map(
        (d) => `
      <tr style="border-bottom:1px solid #eee">
        <td style="padding:8px;font-size:11px">${generateReceiptId(d)}</td>
        <td style="padding:8px">${d.is_anonymous ? "Anonymous" : d.donor_name || ""}</td>
        <td style="padding:8px">${d.amount} ${d.currency || "USD"}</td>
        <td style="padding:8px">${d.purpose || "general"}</td>
        <td style="padding:8px">${d.status}</td>
        <td style="padding:8px">${d.created_date ? format(new Date(d.created_date), "MMM d, yyyy") : ""}</td>
      </tr>`,
      )
      .join("");
    const html = `
      <html><head><title>Donation Report — Madrasa Farooqia</title>
      <style>body{font-family:serif;padding:30px}h1{font-size:20px}table{width:100%;border-collapse:collapse}th{background:#111;color:#fff;padding:8px;text-align:left;font-size:12px}</style></head>
      <body>
        <h1>Donation Report — Madrasa Farooqia</h1>
        <p style="color:#666;font-size:13px">Generated: ${format(new Date(), "PPPp")} · Total: $${totalRaised.toLocaleString()}</p>
        <table><thead><tr><th>Receipt ID</th><th>Donor</th><th>Amount</th><th>Purpose</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>${rows}</tbody></table>
      </body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-playfair font-bold text-3xl text-foreground">
            Donations
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Full donation management & reporting
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download size={14} className="mr-2" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportPDF}>
            <FileText size={14} className="mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Raised", value: `$${totalRaised.toLocaleString()}` },
          { label: "Total Records", value: filtered.length },
          {
            label: "Recurring",
            value: filtered.filter((d) => d.is_recurring).length,
          },
          {
            label: "Anonymous",
            value: filtered.filter((d) => d.is_anonymous).length,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="font-playfair font-bold text-xl text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Filter size={14} /> Filters
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search donor, email, receipt ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 text-sm"
            />
          </div>
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="border border-input bg-background rounded-md px-3 py-2 text-sm min-w-[140px]"
          >
            <option value="all">All Purposes</option>
            {purposes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-input bg-background rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-auto text-sm"
            placeholder="From"
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-auto text-sm"
            placeholder="To"
          />
          {(search ||
            purposeFilter !== "all" ||
            statusFilter !== "all" ||
            dateFrom ||
            dateTo) && (
            <button
              onClick={() => {
                setSearch("");
                setPurposeFilter("all");
                setStatusFilter("all");
                setDateFrom("");
                setDateTo("");
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 skeleton rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <DollarSign size={40} className="mx-auto mb-3 opacity-20" />
            <p>No donations match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  {[
                    "Receipt ID",
                    "Donor",
                    "Amount",
                    "Purpose",
                    "Method",
                    "Recurring",
                    "Status",
                    "Date",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left font-semibold text-muted-foreground p-4 text-xs whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {generateReceiptId(d)}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-foreground">
                        {d.is_anonymous ? "Anonymous" : d.donor_name || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d.donor_email || ""}
                      </p>
                    </td>
                    <td className="p-4 font-playfair font-bold text-foreground whitespace-nowrap">
                      {d.currency || "$"}
                      {Number(d.amount).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 bg-secondary rounded-full text-xs capitalize">
                        {d.purpose || "general"}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs capitalize">
                      {d.payment_method || "—"}
                    </td>
                    <td className="p-4">
                      {d.is_recurring ? (
                        <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">
                          ✓ {d.recurring_frequency}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          One-time
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          d.status === "completed"
                            ? "bg-foreground text-background"
                            : d.status === "failed"
                              ? "bg-destructive/10 text-destructive"
                              : d.status === "refunded"
                                ? "bg-accent/20 text-accent"
                                : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs whitespace-nowrap">
                      {d.created_date
                        ? format(new Date(d.created_date), "MMM d, yyyy")
                        : "—"}
                    </td>
                    <td className="p-4">
                      {d.status === "completed" && (
                        <button
                          onClick={() => downloadReceipt(d, "IN")}
                          title="Download Tax Receipt"
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary px-2 py-1.5 rounded-lg transition-colors"
                        >
                          <QrCode size={13} /> Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const fakeDonations = Array.from({ length: 80 }).map((_, i) => ({
  id: i + 1,
  donor_name: ["Ali Khan", "Ahmed Raza", "Fatima Noor", "John Doe"][i % 4],
  donor_email: `user${i}@mail.com`,
  amount: Math.floor(Math.random() * 500) + 20,
  currency: "USD",
  purpose: ["zakat", "education", "mosque", "general"][i % 4],
  status: ["completed", "pending", "failed", "refunded"][i % 4],
  is_recurring: i % 5 === 0,
  recurring_frequency: "monthly",
  payment_method: ["card", "paypal", "bank"][i % 3],
  is_anonymous: i % 7 === 0,
  receipt_id: `REC-${1000 + i}`,
  created_date: new Date(Date.now() - i * 86400000).toISOString(),
}));
