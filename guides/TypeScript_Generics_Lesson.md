# TypeScript Generics: A Practical Lesson

## What Are Generics?

Generics are like "type variables" that allow you to write flexible, reusable code that works with different types while maintaining type safety.

Think of generics as **templates** where you can plug in different types, just like how you can plug different ingredients into a recipe template.

## The Problem We Solved

### Before (Problematic Code)
```typescript
// This was trying to handle two different form types
type InputWithLabelProps = {
  name: keyof ReservationFormValues | keyof SignUpFormSchema;
  register: UseFormRegister<ReservationFormValues | SignUpFormSchema>;
  // ... other props
}
```

**The Problem**: TypeScript couldn't figure out which specific type to use, causing errors like:
- "Type 'date' is not assignable to type 'name' | 'email' | 'password'"
- Complex type conflicts between different form schemas

### After (Generic Solution)
```typescript
// Now it works with ANY form type
type InputWithLabelProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  // ... other props
}
```

## Breaking Down the Generic Solution

### 1. Generic Type Parameter
```typescript
<T extends FieldValues>
```
- `T` is our "type variable" (you can name it anything: `T`, `FormType`, `TForm`, etc.)
- `extends FieldValues` is a **constraint** - it means `T` must be a type that extends `FieldValues`
- This ensures we only accept valid form types

### 2. Generic Function Signature
```typescript
export const InputWithLabel = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  type = "text",
  ...props
}: InputWithLabelProps<T>) => {
```

**Key Points**:
- `<T extends FieldValues>` declares the generic type parameter
- `InputWithLabelProps<T>` uses the generic type in the props interface
- The function becomes "generic" - it can work with different types

## How TypeScript Infers Types

### When You Use the Component

```typescript
// In your signup form
const {
  register,
  formState: { errors },
} = useForm<SignUpFormSchema>({...});

// TypeScript automatically infers T = SignUpFormSchema
<InputWithLabel 
  register={register}  // UseFormRegister<SignUpFormSchema>
  name="name"          // Path<SignUpFormSchema> = "name" | "email" | "password"
  label="Jméno" 
  error={errors.name} 
/>
```

**What happens**:
1. TypeScript sees `register` is `UseFormRegister<SignUpFormSchema>`
2. It infers `T = SignUpFormSchema`
3. `name` must be `Path<SignUpFormSchema>` (only valid field names)
4. `error` must match the field type

### In Another Form
```typescript
// In a reservation form
const {
  register,
  formState: { errors },
} = useForm<ReservationFormValues>({...});

// TypeScript automatically infers T = ReservationFormValues
<InputWithLabel 
  register={register}  // UseFormRegister<ReservationFormValues>
  name="date"          // Path<ReservationFormValues> = "date" | "time" | "peopleCount" | etc.
  label="Date" 
  error={errors.date} 
/>
```

## Key Concepts Explained

### 1. Type Constraints (`extends`)
```typescript
<T extends FieldValues>
```
- **Purpose**: Ensures `T` has the minimum required properties
- **Benefit**: Prevents invalid types from being used
- **Example**: `FieldValues` ensures the type has string keys

### 2. Type Inference
TypeScript automatically figures out the generic type based on usage:
```typescript
// TypeScript sees this:
register: UseFormRegister<SignUpFormSchema>

// And infers:
T = SignUpFormSchema
```

### 3. Path<T> vs keyof T
```typescript
// ❌ keyof T - too broad
name: keyof T  // Could be any property

// ✅ Path<T> - form-specific
name: Path<T>  // Only valid form field names
```

## Real-World Analogies

### 1. Recipe Template
```typescript
// Generic recipe function
function makeRecipe<T extends Food>(ingredients: T[]): Dish<T> {
  return cook(ingredients);
}

// Usage
makeRecipe<Apple>([apple1, apple2]);  // ApplePie
makeRecipe<Chicken>([chicken1, chicken2]);  // ChickenDish
```

### 2. Container Box
```typescript
// Generic container
class Box<T> {
  private item: T;
  
  put(item: T) { this.item = item; }
  get(): T { return this.item; }
}

// Usage
const stringBox = new Box<string>();
const numberBox = new Box<number>();
```

## Common Generic Patterns

### 1. Generic Functions
```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const str = identity<string>("hello");
const num = identity<number>(42);
```

### 2. Generic Interfaces
```typescript
interface Container<T> {
  value: T;
  getValue(): T;
}
```

### 3. Generic Classes
```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}
```

## Benefits of Generics

### 1. **Type Safety**
```typescript
// Without generics - unsafe
function getFirst(arr: any[]): any {
  return arr[0];
}

// With generics - type safe
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// Usage
const firstString = getFirst<string>(["a", "b", "c"]); // Type: string
const firstNumber = getFirst<number>([1, 2, 3]);       // Type: number
```

### 2. **Code Reusability**
```typescript
// One component works with many types
<InputWithLabel<SignUpForm> ... />
<InputWithLabel<ReservationForm> ... />
<InputWithLabel<ContactForm> ... />
```

### 3. **IntelliSense Support**
- Autocomplete shows only valid field names
- Type errors catch mistakes at compile time
- Better developer experience

## Common Mistakes to Avoid

### 1. Forgetting Constraints
```typescript
// ❌ Too permissive
function process<T>(item: T) { ... }

// ✅ With constraints
function process<T extends { id: string }>(item: T) { ... }
```

### 2. Over-constraining
```typescript
// ❌ Too restrictive
<T extends SpecificFormType>

// ✅ Just right
<T extends FieldValues>
```

### 3. Not Using Type Inference
```typescript
// ❌ Unnecessary type annotation
<InputWithLabel<SignUpFormSchema> register={register} ... />

// ✅ Let TypeScript infer
<InputWithLabel register={register} ... />
```

## Practice Exercises

### Exercise 1: Generic Array Functions
```typescript
// Create a generic function that finds the maximum value in an array
function findMax<T extends number>(arr: T[]): T | undefined {
  // Your code here
}

// Test it
const numbers = [1, 5, 3, 9, 2];
const max = findMax(numbers); // Should be 9
```

### Exercise 2: Generic Key-Value Store
```typescript
// Create a generic class for storing key-value pairs
class KeyValueStore<K, V> {
  private store = new Map<K, V>();
  
  set(key: K, value: V): void {
    // Your code here
  }
  
  get(key: K): V | undefined {
    // Your code here
  }
}

// Test it
const userStore = new KeyValueStore<string, User>();
userStore.set("user1", { name: "John", age: 30 });
```

### Exercise 3: Generic Form Field
```typescript
// Create a generic form field component
type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
};

function FormField<T extends FieldValues>({ name, label, register, error }: FormFieldProps<T>) {
  // Your code here
}
```

## Summary

Generics are powerful because they:
1. **Maintain type safety** while being flexible
2. **Reduce code duplication** by creating reusable components
3. **Provide better developer experience** with autocomplete and error checking
4. **Make code more maintainable** by catching errors at compile time

The key is to think of generics as **type parameters** that make your code work with different types while keeping the same logic and structure.

## Next Steps

1. Practice with the exercises above
2. Try creating your own generic components
3. Look at popular libraries (React, lodash) to see how they use generics
4. Experiment with more complex generic constraints and multiple type parameters

Remember: Generics are about finding the right balance between flexibility and type safety! 