import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Plus, X, Palette, Tag, AlertCircle, Package, Type } from 'lucide-react';
import { canSubmitItemDetails, isOtherCategory } from '@/lib/item-naming';

export interface ItemDetails {
  itemName: string;
  color: string;
  brand: string;
  condition: string;
  contents: string[];
  uniqueMarks: string[];
  additionalNotes: string;
}

interface ItemDetailsFormProps {
  category: string;
  onSubmit: (details: ItemDetails) => void;
}

const conditionOptions = ['Like new', 'Good', 'Scratched', 'Cracked screen', 'Small tear', 'Stained', 'Worn out'];
const commonColors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Brown'];

export const ItemDetailsForm: React.FC<ItemDetailsFormProps> = ({ category, onSubmit }) => {
  const needsName = isOtherCategory(category);
  const [itemName, setItemName] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [contents, setContents] = useState<string[]>([]);
  const [markInput, setMarkInput] = useState('');
  const [uniqueMarks, setUniqueMarks] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showMore, setShowMore] = useState(false);

  const addContent = () => {
    if (contentInput.trim() && contents.length < 5) {
      setContents([...contents, contentInput.trim()]);
      setContentInput('');
    }
  };

  const addMark = () => {
    if (markInput.trim() && uniqueMarks.length < 5) {
      setUniqueMarks([...uniqueMarks, markInput.trim()]);
      setMarkInput('');
    }
  };

  const canSubmit = canSubmitItemDetails(category, { itemName, color, brand, condition, contents, uniqueMarks });

  const handleSubmit = () => {
    onSubmit({ itemName: itemName.trim(), color, brand, condition, contents, uniqueMarks, additionalNotes });
  };

  return (
    <div className="space-y-5">
      {/* Item name — the first thing to fill when the category is "Other" */}
      {needsName && (
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Type className="w-4 h-4 text-primary" />
            What is it?
          </Label>
          <p className="text-sm text-muted-foreground">Say it the way you’d say it out loud.</p>
          <Input
            autoFocus
            placeholder="e.g. bandana, water bottle, sunglasses..."
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit) { e.preventDefault(); handleSubmit(); } }}
            className="bg-background border-border"
          />
        </div>
      )}

      {/* Color */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-foreground font-medium">
          <Palette className="w-4 h-4 text-primary" />
          Color
        </Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {commonColors.map((c) => (
            <Badge
              key={c}
              variant={color === c ? 'default' : 'outline'}
              className={`cursor-pointer transition-all duration-200 ${
                color === c
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/10 border-border'
              }`}
              onClick={() => setColor(color === c ? '' : c)}
            >
              {c}
            </Badge>
          ))}
        </div>
        <Input
          placeholder="Or type a specific color..."
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="bg-background border-border mt-1"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        aria-expanded={showMore}
        className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground"
      >
        {showMore ? 'Fewer details' : 'Add more details (optional)'}
        <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
      </button>

      {showMore && <div className="space-y-5">
      {/* Brand */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-foreground font-medium">
          <Tag className="w-4 h-4 text-primary" />
          Brand (optional)
        </Label>
        <Input
          placeholder={`e.g. Nike, Samsung, Apple...`}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-foreground font-medium">
          <AlertCircle className="w-4 h-4 text-primary" />
          Condition / Marks
        </Label>
        <div className="flex flex-wrap gap-2">
          {conditionOptions.map((opt) => (
            <Badge
              key={opt}
              variant={condition === opt ? 'default' : 'outline'}
              className={`cursor-pointer transition-all duration-200 ${
                condition === opt
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/10 border-border'
              }`}
              onClick={() => setCondition(condition === opt ? '' : opt)}
            >
              {opt}
            </Badge>
          ))}
        </div>
      </div>

      {/* Contents */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-foreground font-medium">
          <Package className="w-4 h-4 text-primary" />
          Contents inside (optional)
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Red water bottle"
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addContent())}
            className="bg-background border-border"
          />
          <Button type="button" size="icon" variant="outline" onClick={addContent} disabled={!contentInput.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {contents.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {contents.map((item, i) => (
              <Badge key={i} variant="secondary" className="gap-1 bg-secondary text-secondary-foreground">
                {item}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setContents(contents.filter((_, idx) => idx !== i))} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Unique Marks */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-foreground font-medium">
          <AlertCircle className="w-4 h-4 text-primary" />
          Unique marks or features (optional)
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Sticker on the back"
            value={markInput}
            onChange={(e) => setMarkInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMark())}
            className="bg-background border-border"
          />
          <Button type="button" size="icon" variant="outline" onClick={addMark} disabled={!markInput.trim()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {uniqueMarks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {uniqueMarks.map((mark, i) => (
              <Badge key={i} variant="secondary" className="gap-1 bg-secondary text-secondary-foreground">
                {mark}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setUniqueMarks(uniqueMarks.filter((_, idx) => idx !== i))} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <Label className="text-foreground font-medium">Additional notes (optional)</Label>
        <Textarea
          placeholder="Any other details that could help identify this item..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="bg-background border-border resize-none"
          rows={3}
        />
      </div>
      </div>}

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Continue
      </Button>
    </div>
  );
};
