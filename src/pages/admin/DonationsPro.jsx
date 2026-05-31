import { useState } from "react";
import {
  Search,
  Download,
  Filter,
  DollarSign,
  FileText,
  QrCode,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { format } from "date-fns";
import { generateReceiptId, downloadReceipt } from "../../lib/receiptGenerator";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { useAdminDonationsQuery } from "../../hooks/api";
import { getStatusLabel, getStatusClass } from "../../lib/statusUtils";

export default function DonationsPro() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { data: donations = [], isLoading: loading } = useAdminDonationsQuery(
    "-created_date",
    1000,
  );
  const [search, setSearch] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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

  const getPurposeLabel = (p) => {
    switch (p?.toLowerCase()) {
      case "education":
        return t("admin:education", "Islamic Education");
      case "mosque":
      case "masjid":
        return t("admin:masjid", "Masjid Project");
      case "zakat":
        return t("admin:zakat", "Zakat");
      case "general":
        return t("admin:general", "General");
      default:
        return p;
    }
  };

  // const getStatusLabel = (s) => {
  //   switch (s) {
  //     case "completed":
  //       return t("admin:completed", "Completed");
  //     case "pending":
  //       return t("admin:pending", "Pending");
  //     case "failed":
  //       return t("admin:failed", "Failed");
  //     case "refunded":
  //       return t("admin:refunded", "Refunded");
  //     default:
  //       return s;
  //   }
  // };

  const exportCSV = () => {
    const rows = [
      [
        t("admin:receiptId", "Receipt ID"),
        t("admin:donor", "Donor"),
        t("admin:email", "Email"),
        t("admin:amount", "Amount"),
        t("admin:currency", "Currency"),
        t("admin:purpose", "Purpose"),
        t("admin:status", "Status"),
        t("admin:recurring", "Recurring"),
        t("admin:date", "Date"),
        t("admin:receipt", "receipt"),
      ],
      ...filtered.map((d) => [
        generateReceiptId(d),
        d.is_anonymous ? t("admin:anonymous", "Anonymous") : d.donor_name || "",
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
        <td style="padding:8px">${d.is_anonymous ? t("admin:anonymous", "Anonymous") : d.donor_name || ""}</td>
        <td style="padding:8px">${d.amount} ${d.currency || "USD"}</td>
        <td style="padding:8px">${getPurposeLabel(d.purpose)}</td>
        <td style="padding:8px">${getStatusLabel(d.status)}</td>
        <td style="padding:8px">${d.created_date ? format(new Date(d.created_date), "MMM d, yyyy") : ""}</td>
      </tr>`,
      )
      .join("");
    const html = `
      <html><head><title>${t("admin:donationReport", "Donation Report")} — Madrasa Farooqia</title>
      <style>body{font-family:serif;padding:30px}h1{font-size:20px}table{width:100%;border-collapse:collapse}th{background:#111;color:#fff;padding:8px;text-align:left;font-size:12px}</style></head>
      <body>
        <h1>${t("admin:donationReport", "Donation Report")} — Madrasa Farooqia</h1>
        <p style="color:#666;font-size:13px">${t("admin:generated", "Generated")}: ${format(new Date(), "PPPp")} · ${t("admin:total", "Total")}: $${totalRaised.toLocaleString()}</p>
        <table><thead><tr><th>${t("admin:receiptId", "Receipt ID")}</th><th>${t("admin:donor", "Donor")}</th><th>${t("admin:amount", "Amount")}</th><th>${t("admin:purpose", "Purpose")}</th><th>${t("admin:status", "Status")}</th><th>${t("admin:date", "Date")}</th></tr></thead>
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
            {t("admin:donationsTitle", "Donations")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t(
              "admin:fullDonationManagement",
              "Full donation management & reporting",
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download size={14} className="mr-2" />
            {t("admin:csv", "CSV")}
          </Button>
          <Button variant="outline" size="sm" onClick={exportPDF}>
            <FileText size={14} className="mr-2" />
            {t("admin:pdfReport", "PDF")}
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: t("admin:totalRaised", "Total Raised"),
            value: `$${totalRaised.toLocaleString()}`,
          },
          {
            label: t("admin:totalRecords", "Total Records"),
            value: filtered.length,
          },
          {
            label: t("admin:recurring", "Recurring"),
            value: filtered.filter((d) => d.is_recurring).length,
          },
          {
            label: t("admin:anonymous", "Anonymous"),
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
          <Filter size={14} /> {t("admin:filters", "Filters")}
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder={t(
                "admin:searchDonationsPlaceholder",
                "Search donor, email, receipt ID...",
              )}
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
            <option value="all">
              {t("admin:allPurposes", "All Purposes")}
            </option>
            {purposes.map((p) => (
              <option key={p} value={p}>
                {getPurposeLabel(p)}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-input bg-background rounded-md px-3 py-2 text-sm"
          >
            <option value="all">{t("admin:allStatus", "All Status")}</option>
            <option value="completed">
              {t("admin:completed", "Completed")}
            </option>
            <option value="pending">{t("admin:pending", "Pending")}</option>
            <option value="failed">{t("admin:failed", "Failed")}</option>
            <option value="refunded">{t("admin:refunded", "Refunded")}</option>
          </select>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-auto text-sm"
            placeholder={t("admin:fromDate", "From")}
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-auto text-sm"
            placeholder={t("admin:toDate", "To")}
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
              {t("admin:clear", "Clear")}
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
            <p>
              {t("admin:noDonationsMatch", "No donations match your filters.")}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  {[
                    t("admin:receiptId", "Receipt ID"),
                    t("admin:donor", "Donor"),
                    t("admin:amount", "Amount"),
                    t("admin:purpose", "Purpose"),
                    t("admin:method", "Method"),
                    t("admin:recurring", "Recurring"),
                    t("admin:status", "Status"),
                    t("admin:date", "Date"),
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
                        {d.is_anonymous
                          ? t("admin:anonymous", "Anonymous")
                          : d.donor_name || "—"}
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
                        {getPurposeLabel(d.purpose)}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs capitalize">
                      {d.payment_method || "—"}
                    </td>
                    <td className="p-4">
                      {d.is_recurring ? (
                        <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">
                          ✓ {t("admin:monthly", "monthly")}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {t("admin:oneTime", "One-time")}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {/* <span
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
                        {getStatusLabel(d.status)}
                      </span> */}
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${getStatusClass(d.status)}`}
                      >
                        {getStatusLabel(d.status, t)}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs whitespace-nowrap">
                      {d.created_date
                        ? format(new Date(d.created_date), "MMM d, yyyy")
                        : "—"}
                    </td>
                    <td className="p-4">
                      {d?.status?.toLowerCase() === "completed" && (
                        <button
                          onClick={() => downloadReceipt(d, "IN", language)}
                          title={t(
                            "admin:downloadTaxReceipt",
                            "Download Tax Receipt",
                          )}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary px-2 py-1.5 rounded-lg transition-colors"
                        >
                          <QrCode size={13} /> {t("admin:receipt", "Receipt")}
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
