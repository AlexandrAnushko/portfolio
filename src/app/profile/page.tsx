import PageLayout from "@/shared/components/layouts/PageLayout";

export default function Profile() {
  return (
    <PageLayout id="profile-page" isProtected={true}>
      <h1 className="text-5xl">Profile</h1>
    </PageLayout>
  );
}
