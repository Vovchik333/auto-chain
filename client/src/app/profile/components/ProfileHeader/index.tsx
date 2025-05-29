import { PageContentHeader } from "@/components/PageContentHeader";
import { PageContentTitle } from "@/components/PageContentTitle";
import { useUserStore } from "@/stores/user/user.store";
import { useTranslations } from 'next-intl';

export const ProfileHeader: React.FC = () => {
  const { user } = useUserStore();
  const t = useTranslations('profile');

  if (!user) return null;

  return (
    <PageContentHeader className="bg-background rounded-2xl border border-border p-6 theme-transition">
      <div className="flex items-center gap-4">
        <div>
          <PageContentTitle text={t('title')} />
          <p className="text-muted-foreground text-sm mt-1.5 theme-transition">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </PageContentHeader>
  );
}
