import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const {
    full_name,
    active,
    password,
  } = await req.json();


  // Actualizar tabla users
  const { error } = await supabaseAdmin
    .from("users")
    .update({
      full_name,
      active,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Cambiar contraseña si viene informada
  if (password && password.trim() !== "") {
    const { error: authError } =
      await supabaseAdmin.auth.admin.updateUserById(
        id,
        {
          password,
        }
      );

    if (authError) {
      return NextResponse.json(
        {
          error: authError.message,
        },
        {
          status: 400,
        }
      );
    }
  }


  return NextResponse.json({
    success: true,
  });
}
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
  
    // Eliminar de public.users
    const { error } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", id);
  
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  
    // Eliminar de auth.users
    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(id);
  
    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }
  
    return NextResponse.json({
      success: true,
    });
  }