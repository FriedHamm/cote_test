import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({ children }){

  return (
    <div className="pt-20 min-h-full">
      <AuthGuard requiredRole="S">
        {children}
      </AuthGuard>
    </div>
  )

}