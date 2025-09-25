'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { itemFormDataSchema, ItemFormData } from '@/lib/validation/bigpost';
import { ItemType } from '@/types/bigpost';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Plus, Trash2, AlertCircle } from 'lucide-react';

interface ItemsFormProps {
  onItemsChange: (items: ItemFormData[]) => void;
  className?: string;
}

interface ItemsFormData {
  items: ItemFormData[];
}

const defaultItem: ItemFormData = {
  itemType: ItemType.CARTON,
  description: '',
  quantity: 1,
  height: 10,
  width: 20,
  length: 30,
  weight: 1,
  consolidatable: true
};

const itemTypeOptions: { value: ItemType; label: string }[] = [
  { value: ItemType.CARTON, label: 'Carton' },
  { value: ItemType.SKID, label: 'Skid' },
  { value: ItemType.PALLET, label: 'Pallet' },
  { value: ItemType.PACK, label: 'Pack' },
  { value: ItemType.CRATE, label: 'Crate' },
  { value: ItemType.ROLL, label: 'Roll' },
  { value: ItemType.SATCHEL, label: 'Satchel' },
  { value: ItemType.STILLAGE, label: 'Stillage' },
  { value: ItemType.TUBE, label: 'Tube' },
  { value: ItemType.BAG, label: 'Bag' }
];

export function ItemsForm({ onItemsChange, className }: ItemsFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<ItemsFormData>({
    resolver: zodResolver(z.object({
      items: z.array(itemFormDataSchema).min(1, 'At least one item is required')
    })),
    defaultValues: {
      items: [defaultItem]
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const watchedItems = watch('items');

  // Notify parent of items changes
  React.useEffect(() => {
    if (isValid && watchedItems.length > 0) {
      onItemsChange(watchedItems);
    }
  }, [watchedItems, isValid, onItemsChange]);

  const addItem = () => {
    append(defaultItem);
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const getItemTypeLabel = (itemType: ItemType): string => {
    const option = itemTypeOptions.find(opt => opt.value === itemType);
    return option?.label || 'Unknown';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Items to Ship
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add all items you want to ship. Each item will be validated against BigPost requirements.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  Item {index + 1}
                </h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Item Type */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.itemType`}>Item Type *</Label>
                  <select
                    {...register(`items.${index}.itemType`)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.items?.[index]?.itemType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {itemTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.items?.[index]?.itemType && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.itemType?.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.description`}>Description *</Label>
                  <Input
                    {...register(`items.${index}.description`)}
                    placeholder="Item description (max 50 characters)"
                    maxLength={50}
                    className={errors.items?.[index]?.description ? 'border-red-500' : ''}
                  />
                  {errors.items?.[index]?.description && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.description?.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.quantity`}>Quantity *</Label>
                  <Input
                    type="number"
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    placeholder="1"
                    min="1"
                    className={errors.items?.[index]?.quantity ? 'border-red-500' : ''}
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.quantity?.message}
                    </p>
                  )}
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.weight`}>Weight (kg) *</Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register(`items.${index}.weight`, { valueAsNumber: true })}
                    placeholder="1.0"
                    min="0.1"
                    className={errors.items?.[index]?.weight ? 'border-red-500' : ''}
                  />
                  {errors.items?.[index]?.weight && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.weight?.message}
                    </p>
                  )}
                </div>

                {/* Dimensions */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.length`}>Length (cm) *</Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register(`items.${index}.length`, { valueAsNumber: true })}
                    placeholder="30"
                    min="0.1"
                    className={errors.items?.[index]?.length ? 'border-red-500' : ''}
                  />
                  {errors.items?.[index]?.length && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.length?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.width`}>Width (cm) *</Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register(`items.${index}.width`, { valueAsNumber: true })}
                    placeholder="20"
                    min="0.1"
                    className={errors.items?.[index]?.width ? 'border-red-500' : ''}
                  />
                  {errors.items?.[index]?.width && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.width?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.height`}>Height (cm) *</Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register(`items.${index}.height`, { valueAsNumber: true })}
                    placeholder="10"
                    min="0.1"
                    className={errors.items?.[index]?.height ? 'border-red-500' : ''}
                  />
                  {errors.items?.[index]?.height && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.height?.message}
                    </p>
                  )}
                </div>

                {/* Consolidatable */}
                <div className="space-y-2">
                  <Label htmlFor={`items.${index}.consolidatable`}>Consolidatable</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`items.${index}.consolidatable`)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      Can be packed with other items
                    </span>
                  </div>
                </div>
              </div>

              {/* Item Summary */}
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-600">
                  <strong>{getItemTypeLabel(watchedItems[index]?.itemType || ItemType.CARTON)}</strong> • 
                  Qty: {watchedItems[index]?.quantity || 0} • 
                  Weight: {watchedItems[index]?.weight || 0}kg • 
                  Dimensions: {watchedItems[index]?.length || 0}×{watchedItems[index]?.width || 0}×{watchedItems[index]?.height || 0}cm
                </div>
              </div>
            </div>
          ))}

          {/* Add Item Button */}
          <Button
            type="button"
            variant="outline"
            onClick={addItem}
            className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Item
          </Button>

          {/* Validation Summary */}
          {errors.items && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">Validation Errors</h4>
                  <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                    {errors.items.map((itemError, index) => (
                      <li key={index}>
                        Item {index + 1}: {Object.values(itemError || {}).map(error => 
                          typeof error === 'string' ? error : error?.message
                        ).join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
