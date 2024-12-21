import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";
import Select2 from "@/Components/Select2";

export default function Edit({ auth }) {
    // destruct roles and user from usepage props
    const { user, roles } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        uid: user.uid,
        selectedRoles: user.roles.map((role) => role.name),
        filterRole: user.roles.map((role) => ({
            value: role.name,
            label: role.name,
        })),
        _method: "put",
    });

    const formattedRoles = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));

    // define method handleSelectedroles
    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map((option) => option.value);
        setData("selectedRoles", selectedValues);
    };

    // define method handleUpdateData
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route("users.update", user.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data updated successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit User
                </h2>
            }
        >
            <Head title={"Edit Users"} />
            <Container>
                <Card title={"Edit user"}>
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <div className="mb-4">
                                <Input
                                    label={"Uid"}
                                    type={"text"}
                                    value={data.uid}
                                    onChange={(e) =>
                                        setData("uid", e.target.value)
                                    }
                                    errors={errors.uid}
                                    placeholder="Input Uid User.."
                                />
                            </div>
                            <Input
                                label={"Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                                placeholder="Input name user.."
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label={"Email"}
                                type={"email"}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                errors={errors.email}
                                placeholder="Input email user.."
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                Roles
                            </div>
                            <Select2
                                onChange={handleSelectedRoles}
                                defaultOptions={data.filterRole}
                                options={formattedRoles}
                                placeholder="Pilih Role..."
                            />
                        </div>
                        {/* <div className='mb-4'>
                            <div className={`p-4 rounded-t-lg border bg-white`}>
                                <div className='flex items-center gap-2 text-sm text-gray-700'>
                                    Roles
                                </div>
                            </div>
                            <div className='p-4 rounded-b-lg border border-t-0 bg-gray-100'>
                                <div className='flex flex-row flex-wrap gap-4'>
                                    {roles.map((role, i) => (
                                        <Checkbox label={role.name} value={role.name} onChange={handleSelectedRoles} defaultChecked={data.selectedRoles.includes(role.name)} key={i}/>
                                    ))}
                                </div>
                                {errors.selectedRoles && <div className='text-xs text-red-500 mt-4'>{errors.selectedRoles}</div>}
                            </div>
                        </div> */}
                        <div className="flex items-center gap-2">
                            <Button type={"submit"} processing={processing} />
                            <Button
                                type={"cancel"}
                                url={route("users.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
