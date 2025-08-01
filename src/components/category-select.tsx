import React from 'react';
import { Key, Smartphone, Wallet, Headphones, CreditCard, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CategorySelectProps {
  onSelect: (category: string) => void;
}

const categories = [
  { id: 'keys', label: 'Keys', icon: Key, color: 'from-blue-500 to-blue-600' },
  { id: 'phone', label: 'Phone', icon: Smartphone, color: 'from-green-500 to-green-600' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, color: 'from-purple-500 to-purple-600' },
  { id: 'headphones', label: 'Headphones', icon: Headphones, color: 'from-orange-500 to-orange-600' },
  { id: 'passport', label: 'Passport', icon: CreditCard, color: 'from-red-500 to-red-600' },
  { id: 'other', label: 'Other', icon: MoreHorizontal, color: 'from-gray-500 to-gray-600' },
];

export const CategorySelect: React.FC<CategorySelectProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <Card
            key={category.id}
            className="p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-0 bg-card/70 backdrop-blur-sm hover:bg-card/90"
            onClick={() => onSelect(category.label)}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold text-foreground">{category.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};