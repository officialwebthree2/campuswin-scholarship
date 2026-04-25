import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, LogOut, Search, Download, RefreshCw, Users, Clock,
  CheckCircle2, XCircle, Star, Eye, Trash2, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ApplicationDetailDialog } from "@/components/admin/ApplicationDetailDialog";
import { type Application, STATUS_META } from "@/types/application";

const STATUS_OPTIONS: Application["status"][] = ["pending", "shortlisted", "selected", "rejected"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Application | null>(null);

  const fetchApps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
    } else {
      setApps((data ?? []) as Application[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchApps(); }, []);

  const stats = useMemo(() => {
    const total = apps.length;
    const by = (s: Application["status"]) => apps.filter((a) => a.status === s).length;
    return {
      total,
      pending: by("pending"),
      shortlisted: by("shortlisted"),
      selected: by("selected"),
      rejected: by("rejected"),
    };
  }, [apps]);

  const states = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((a) => a.state_of_residence && set.add(a.state_of_residence));
    return Array.from(set).sort();
  }, [apps]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apps.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (stateFilter !== "all" && a.state_of_residence !== stateFilter) return false;
      if (!q) return true;
      return [a.full_name, a.email, a.phone, a.institution, a.course_of_study, a.tech_program, a.cohort]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q));
    });
  }, [apps, search, statusFilter, stateFilter]);

  const updateStatus = async (id: string, status: Application["status"]) => {
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    toast({ title: "Status updated", description: `Marked as ${status}.` });
  };

  const updateRecord = async (id: string, patch: Partial<Application>) => {
    const { error } = await supabase.from("applications").update(patch).eq("id", id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    setSelected((s) => (s && s.id === id ? { ...s, ...patch } : s));
  };

  const deleteApp = async (id: string) => {
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    setApps((prev) => prev.filter((a) => a.id !== id));
    setSelected(null);
    toast({ title: "Application deleted" });
  };

  const exportCsv = () => {
    if (!filtered.length) return;
    const cols = Object.keys(filtered[0]) as (keyof Application)[];
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v).replace(/"/g, '""');
      return `"${s}"`;
    };
    const csv = [
      cols.join(","),
      ...filtered.map((row) => cols.map((c) => escape(row[c])).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campuswin-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const StatCard = ({
    icon: Icon, label, value, tone,
  }: { icon: typeof Users; label: string; value: number; tone: string }) => (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-1 font-display text-3xl font-bold text-primary">{value}</div>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-primary text-primary-foreground shadow-soft">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold">
              <GraduationCap className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-none">CampusWin</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">Admin Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={fetchApps} variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-glow">
              <RefreshCw className="mr-1.5 h-4 w-4" /> Refresh
            </Button>
            <Button onClick={signOut} variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-glow">
              <LogOut className="mr-1.5 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={Users}        label="Total Applicants" value={stats.total}       tone="bg-primary/10 text-primary" />
          <StatCard icon={Clock}        label="Pending"          value={stats.pending}     tone="bg-warning/15 text-warning" />
          <StatCard icon={Star}         label="Shortlisted"      value={stats.shortlisted} tone="bg-primary/15 text-primary" />
          <StatCard icon={CheckCircle2} label="Selected"         value={stats.selected}    tone="bg-success/15 text-success" />
          <StatCard icon={XCircle}      label="Rejected"         value={stats.rejected}    tone="bg-destructive/10 text-destructive" />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, school, course, cohort…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="md:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{STATUS_META[s].label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="md:w-48"><SelectValue placeholder="State" /></SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="all">All states</SelectItem>
              {states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={exportCsv} className="bg-gold font-semibold text-accent-foreground shadow-gold hover:opacity-95">
            <Download className="mr-1.5 h-4 w-4" /> Export CSV
          </Button>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading applications…
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <Users className="mx-auto mb-2 h-10 w-10 opacity-40" />
              No applications match your filters yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead>Applicant</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Tech Program</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cohort</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => (
                    <TableRow key={a.id} className="hover:bg-secondary/30">
                      <TableCell>
                        <div className="font-medium text-primary">{a.full_name}</div>
                        <div className="text-xs text-muted-foreground">{a.email} · {a.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{a.institution}</div>
                        <div className="text-xs text-muted-foreground">{a.course_of_study ?? "—"} · {a.current_level}</div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                          {a.tech_program ?? "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{a.state_of_residence ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={STATUS_META[a.status].className}>
                          {STATUS_META[a.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.cohort ?? "—"}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost" onClick={() => setSelected(a)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete this application?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove {a.full_name}'s submission. This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteApp(a.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {apps.length} applications
        </div>
      </main>

      <ApplicationDetailDialog
        application={selected}
        onClose={() => setSelected(null)}
        onStatusChange={updateStatus}
        onUpdate={updateRecord}
      />
    </div>
  );
};

export default AdminDashboard;
