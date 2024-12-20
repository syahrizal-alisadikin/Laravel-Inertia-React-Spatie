import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";
import hasAnyPermission from "@/Utils/Permissions";
export default function Index({ auth }) {
    // destruct users props
    const { absensi, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Abensi
                </h2>
            }
        >
            <Head title={"Absensi"} />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {/* {hasAnyPermission(["absensi create"]) && (
                        <Button type={"add"} url={route("a.create")} />
                    )} */}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route("absensi.index")}
                            placeholder={"Search users data by name..."}
                            filter={filters}
                        />
                    </div>
                </div>
                <Table.Card title={"Absensi"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Description</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {absensi.data.map((absen, i) => (
                                <tr key={i}>
                                    <Table.Td>
                                        {++i +
                                            (absensi.current_page - 1) *
                                                absensi.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {absen.user.name}
                                        <div className="text-sm text-gray-400">
                                            {absen.user.email}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {absen.status}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {absen.description}
                                            {/* {hasAnyPermission([
                                                "users edit",
                                            ]) && (
                                                <Button
                                                    type={"edit"}
                                                    url={route(
                                                        "users.edit",
                                                        user.id
                                                    )}
                                                />
                                            )}
                                            {hasAnyPermission([
                                                "users delete",
                                            ]) && (
                                                <Button
                                                    type={"delete"}
                                                    url={route(
                                                        "users.destroy",
                                                        user.id
                                                    )}
                                                />
                                            )} */}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className="flex items-center justify-center">
                    {absensi.last_page !== 1 && (
                        <Pagination links={absensi.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
