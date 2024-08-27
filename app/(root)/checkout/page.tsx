"use client";

import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CartContext } from "@/contexts/cart-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";

// Define the schema using zod
const schema = z.object({
  cardName: z.string().nonempty("Name on Card is required"),
  cardNumber: z
    .string()
    .nonempty("Card Number is required")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card Number must be 16 digits."),
  expMonth: z.string().nonempty("Expiry Month is required"),
  expYear: z.string().nonempty("Expiry Year is required"),
  cvv: z.string().nonempty("CVV is required").length(3, "CVV must be 3 digits"),
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  zipCode: z.string().nonempty("ZIP Code is required"),
  country: z.string().nonempty("Country is required"),
});

export default function Checkout() {
  const { products, setProducts } = useContext(CartContext) as any;
  const router = useRouter();
  const form = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
    },
  });

  const onSubmit = async (data: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          console.log(data); // Payment Data saved
          form.reset();
          setProducts([]);
          router.push("/payment-success");
          resolve();
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }, 3000);
    });
  };

  const onSubmitWithToast = async (data: any) => {
    await toast.promise(onSubmit(data), {
      loading: "Payment data sending...",
      success: "Payment Successful.",
      error: "Something went wrong, please try again!",
    });
  };

  const subtotal = products.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + +item.price * +item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <Separator />

      <Breadcrumb className="my-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/basket">Carts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <form onSubmit={handleSubmit(onSubmitWithToast)}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Controller
                  name="cardName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      {...field}
                      className={errors.cardName ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.cardName && (
                  <span className="text-red-500">
                    {errors.cardName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Controller
                  name="cardNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      {...field}
                      className={errors.cardNumber ? "border-red-500" : ""}
                      onChange={(e) => {
                        const formattedValue = e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d{4})/g, "$1 ")
                          .trim();
                        field.onChange(formattedValue);
                      }}
                      maxLength={19}
                    />
                  )}
                />
                {errors.cardNumber && (
                  <span className="text-red-500">
                    {errors.cardNumber.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expMonth">Expiry Month</Label>
                  <Controller
                    name="expMonth"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger id="expMonth">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <SelectItem key={month} value={month.toString()}>
                                {month.toString().padStart(2, "0")}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.expMonth && (
                    <span className="text-red-500">
                      {errors.expMonth.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expYear">Expiry Year</Label>
                  <Controller
                    name="expYear"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger id="expYear">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: 10 },
                            (_, i) => new Date().getFullYear() + i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.expYear && (
                    <span className="text-red-500">
                      {errors.expYear.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Controller
                    name="cvv"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="cvv"
                        placeholder="123"
                        {...field}
                        className={errors.cvv ? "border-red-500" : ""}
                        maxLength={3}
                      />
                    )}
                  />
                  {errors.cvv && (
                    <span className="text-red-500">{errors.cvv.message}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...field}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...field}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                      className={errors.email ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      {...field}
                      className={errors.address ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="city"
                        placeholder="New York"
                        {...field}
                        className={errors.city ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.city && (
                    <span className="text-red-500">{errors.city.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        {...field}
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.zipCode && (
                    <span className="text-red-500">
                      {errors.zipCode.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uz">Uzbekistan</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <span className="text-red-500">{errors.country.message}</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(20).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(subtotal + 20).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Place Order
              <CreditCard className="h-6 w-6 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
