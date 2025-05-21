import { PageContentHeader } from "@/components/PageContentHeader";
import { PageContentTitle } from "@/components/PageContentTitle";
import { useUserStore } from "@/stores/user/user.store";


export const ProfileHeader: React.FC = () => {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <PageContentHeader className="bg-[#1A1F27] p-6">
      <div className="flex items-center gap-4">
        <div>
          <PageContentTitle text="Profile Settings" />
          <p className="text-[#A3A3A3] text-sm mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
    </PageContentHeader>
  );
}
