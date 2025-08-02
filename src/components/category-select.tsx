import React from 'react';
import { Key, Smartphone, Wallet, Headphones, CreditCard, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CategorySelectProps {
  onSelect: (category: string) => void;
}

const categories = [
  { id: 'keys', label: 'Keys', icon: Key, color: 'from-primary/20 to-primary/30', iconColor: 'text-primary' },
  { id: 'phone', label: 'Phone', icon: Smartphone, color: 'from-accent/20 to-accent/30', iconColor: 'text-accent' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, color: 'from-primary/15 to-accent/20', iconColor: 'text-primary' },
  { id: 'headphones', label: 'Headphones', icon: Headphones, color: 'from-accent/15 to-primary/25', iconColor: 'text-accent' },
  { id: 'passport', label: 'Passport', icon: CreditCard, color: 'from-primary/25 to-primary/35', iconColor: 'text-primary' },
  { id: 'other', label: 'Other', icon: MoreHorizontal, color: 'from-muted/40 to-muted/60', iconColor: 'text-muted-foreground' },
];

export const CategorySelect: React.FC<CategorySelectProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <Card
            key={category.id}
            className="p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-elegant border border-primary/10 bg-card/80 backdrop-blur-sm hover:bg-card/95 hover:border-primary/20 group"
            onClick={() => onSelect(category.label)}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3 shadow-soft group-hover:shadow-strong transition-all duration-300 border border-background/20`}>
                <IconComponent className={`w-7 h-7 ${category.iconColor} transition-transform duration-300 group-hover:scale-110`} />
              </div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{category.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};