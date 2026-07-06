"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { Reclamo, Estado } from "@/lib/types";
import { ReclamoCard } from "./ReclamoCard";
import { RECLAMOS as reclamosData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const priorityVariantMap: Record<Reclamo['prioridad'], "default" | "destructive" | "secondary" | "outline"> = {
  Crítica: "destructive",
  Alta: "default",
  Media: "secondary",
  Baja: "outline",
};

export function ReclamosTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilters, setEstadoFilters] = useState<Set<Estado>>(new Set());

  const handleEstadoFilterChange = (estado: Estado) => {
    setEstadoFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(estado)) {
        newSet.delete(estado);
      } else {
        newSet.add(estado);
      }
      return newSet;
    });
  };

  const filteredReclamos = useMemo(() => {
    return reclamosData.filter((reclamo) => {
      const searchMatch =
        reclamo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamo.sucursal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamo.id.toLowerCase().includes(searchTerm.toLowerCase());

      const estadoMatch = estadoFilters.size === 0 || estadoFilters.has(reclamo.estado);

      return searchMatch && estadoMatch;
    });
  }, [searchTerm, estadoFilters]);

  const estadosDisponibles: Estado[] = ["Nuevo", "En curso", "Esperando cliente", "Resuelto"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Buscar por cliente, sucursal o ID..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1" aria-label="Filtrar reclamos">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filtrar
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {estadosDisponibles.map(estado => (
                      <DropdownMenuCheckboxItem
                        key={estado}
                        checked={estadoFilters.has(estado)}
                        onCheckedChange={() => handleEstadoFilterChange(estado)}>
                        {estado}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {/* Card view for mobile */}
      <div className="grid gap-4 md:hidden">
        {filteredReclamos.map((reclamo) => (
          <ReclamoCard key={reclamo.id} reclamo={reclamo} />
        ))}
      </div>

      {/* Table view for desktop */}
      <div className="hidden rounded-lg border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Sucursal</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReclamos.map((reclamo) => (
              <TableRow key={reclamo.id}>
                <TableCell className="font-medium">{reclamo.id}</TableCell>
                <TableCell>{reclamo.cliente}</TableCell>
                <TableCell>{reclamo.sucursal}</TableCell>
                <TableCell>{formatDate(reclamo.fecha)}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{reclamo.estado}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariantMap[reclamo.prioridad]}>
                    {reclamo.prioridad}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}