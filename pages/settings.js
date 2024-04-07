import React from 'react'
import SideNav from '@/components/nav/SideNav'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { SelectGroup, SelectLabel } from '@radix-ui/react-select'

export default function settings() {
    return (
        <SideNav>
            <Tabs defaultValue="account" className="">
                <TabsList className="grid w-full grid-cols-5 gap-72">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="store">Store</TabsTrigger>
                    <TabsTrigger value="localization">Localization</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="customers">Customers</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="meta">Meta Title</Label>
                                <Input id="meta" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="tag">Meta Tag Description</Label>
                                <Textarea
                                    id="tag"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="keywords">Meta Keywords</Label>
                                <Input id="keywords" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="theme">Theme</Label>
                                <Select>
                                    <SelectTrigger id='theme'>
                                        <SelectValue placeholder="Default" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="minimalist">Minimalist</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="high contrast">High Contrast</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="layout">Default Layout</Label>
                                <Select>
                                    <SelectTrigger id='layout'>
                                        <SelectValue placeholder="Default" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="default">Default</SelectItem>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Fashion">Fashion</SelectItem>
                                            <SelectItem value="Home">Home</SelectItem>
                                            <SelectItem value="Dining">Dining</SelectItem>
                                            <SelectItem value="Interior">Interior</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className='flex gap-2'>
                            <Button>Cancel</Button>
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="store">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="store">Store Name</Label>
                                <Input id="store" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="owner">Store Owner</Label>
                                <Input id="owner" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="geocode">GeoCode</Label>
                                <Input id="geocode" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type='email' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type='phone' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="fax">Fax</Label>
                                <Input id="fax" />
                            </div>
                        </CardContent>
                        <CardFooter className='flex gap-2'>
                            <Button>Cancel</Button>
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="localization">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you will be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="products">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you will be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="customers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you will be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </SideNav>
    )
}
