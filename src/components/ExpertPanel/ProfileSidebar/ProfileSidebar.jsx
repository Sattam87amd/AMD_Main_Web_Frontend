'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfileSidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Profile", href: "/profile", icon: "👤" },
    { name: "Payment Methods", href: "/profile/payment-methods", icon: "💳" },
    { name: "Gift Card", href: "/profile/gift-card", icon: "🎁" },
    { name: "Contact Us", href: "/profile/contact", icon: "📞" },
    { name: "Give Feedback", href: "/profile/feedback", icon: "📝" },
    { name: "Sign Out", href: "/logout", icon: "🚪" },
  ];

  return (
    <aside className="w-64 bg-white p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} 
            className={`block p-2 rounded ${router.pathname === item.href ? 'bg-black text-white' : 'hover:bg-gray-200'}`}>
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
