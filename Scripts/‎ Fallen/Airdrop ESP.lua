client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")

client.on_event("render", function()
    local bases = game:get_service("Workspace"):find_first_child("Bases")
    if not bases then return end  

    local loners = bases:find_first_child("Loners")
    if not loners then return end  

    for _, carePackage in pairs(loners:get_children()) do
        if carePackage.name == "Care Package" then
            local main = carePackage:find_first_child("Main")
            if main and main.address ~= 0 then
                local visible, screenPos = client.world_to_screen(main:get_position())
                if visible then
                    local text_size = 16 
                    local text_width = 8 
                    local text_height = text_size  

                    local carePackagePos = Vector2.new(
                        screenPos.x - (#"Care Package" * text_width / 2),
                        screenPos.y - (text_height * 1.5)
                    )

                    renderer.text(carePackagePos, Color3.new(255, 255, 255), "Care Package", text_size)
                end
            end
        end
    end
end);
